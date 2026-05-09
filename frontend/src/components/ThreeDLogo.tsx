import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Gentle rotation
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} />;
}

export default function ThreeDLogo() {
  const glbUrl = "/abstract logo 3d model.glb";

  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 5] }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment="city" intensity={0.8} contactShadow={false}>
              <Float
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={0.5}
              >
                <Model url={glbUrl} />
              </Float>
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
