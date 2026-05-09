import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Build a soft radial-gradient sprite so particles render as glowing circles */
function buildStarTexture(size = 64): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d')!;
  const half = size / 2;
  const grd = ctx.createRadialGradient(half, half, 0, half, half, half);
  grd.addColorStop(0.00, 'rgba(255,255,255,1.00)');
  grd.addColorStop(0.15, 'rgba(255,255,255,0.90)');
  grd.addColorStop(0.40, 'rgba(255,255,255,0.40)');
  grd.addColorStop(0.80, 'rgba(255,255,255,0.08)');
  grd.addColorStop(1.00, 'rgba(255,255,255,0.00)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;

    const starTex = buildStarTexture(64);

    // ── Layer 1 : small crisp stars ─────────────────────────────────────────
    const STAR_COUNT = 2400;
    const starPos   = new Float32Array(STAR_COUNT * 3);
    const starColor = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2 + Math.random() * 5;
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi) - 2;

      // Cyan → indigo colour range
      const t = Math.random();
      starColor[i * 3]     = 0.05 + t * 0.35;   // R
      starColor[i * 3 + 1] = 0.40 + t * 0.45;   // G
      starColor[i * 3 + 2] = 0.75 + t * 0.25;   // B
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos,   3));
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starColor, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.045,          // larger → visible glowing circles
      map: starTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Layer 2 : large soft nebula clouds ──────────────────────────────────
    const NEBULA_COUNT = 180;
    const nebPos   = new Float32Array(NEBULA_COUNT * 3);
    const nebColor = new Float32Array(NEBULA_COUNT * 3);

    for (let i = 0; i < NEBULA_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.5 + Math.random() * 4;
      nebPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      nebPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      nebPos[i * 3 + 2] = r * Math.cos(phi) - 2;

      // Purple / magenta / deep-blue palette for nebulae
      const rnd = Math.random();
      if (rnd < 0.33) {
        nebColor[i * 3] = 0.35; nebColor[i * 3 + 1] = 0.10; nebColor[i * 3 + 2] = 0.65; // purple
      } else if (rnd < 0.66) {
        nebColor[i * 3] = 0.05; nebColor[i * 3 + 1] = 0.55; nebColor[i * 3 + 2] = 0.90; // sky-blue
      } else {
        nebColor[i * 3] = 0.55; nebColor[i * 3 + 1] = 0.10; nebColor[i * 3 + 2] = 0.75; // violet
      }
    }

    const nebGeo = new THREE.BufferGeometry();
    nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos,   3));
    nebGeo.setAttribute('color',    new THREE.BufferAttribute(nebColor, 3));

    const nebMat = new THREE.PointsMaterial({
      size: 0.28,           // big blurry cloud blobs
      map: starTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nebula = new THREE.Points(nebGeo, nebMat);
    scene.add(nebula);

    // ── Torus rings ─────────────────────────────────────────────────────────
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.008, 16, 200);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.15 });
    const ring1    = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.005, 16, 200);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.10 });
    const ring2    = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 5;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.4, 0.003, 16, 200);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.06 });
    const ring3    = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 7;
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    // ── Mouse parallax ───────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', onMouse);

    // ── Resize ───────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ──────────────────────────────────────────────────────────────
    let animId: number;
    const startTime = performance.now();
    
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      stars.rotation.y  =  t * 0.04 + mouseX;
      stars.rotation.x  =  t * 0.02 + mouseY;
      nebula.rotation.y = -t * 0.02 + mouseX * 0.5;
      nebula.rotation.x =  t * 0.01 + mouseY * 0.5;
      ring1.rotation.z  =  t * 0.08;
      ring2.rotation.z  = -t * 0.05;
      ring3.rotation.z  =  t * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      [starGeo, nebGeo, ring1Geo, ring2Geo, ring3Geo].forEach(g => g.dispose());
      [starMat, nebMat, ring1Mat, ring2Mat, ring3Mat].forEach(m => m.dispose());
      starTex.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, background: 'transparent' }}
    />
  );
}
