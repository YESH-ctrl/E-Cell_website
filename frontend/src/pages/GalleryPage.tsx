import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Gallery />
      </motion.div>
      <Footer />
    </div>
  );
}
