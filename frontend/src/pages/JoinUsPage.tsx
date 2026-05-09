import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JoinUs from '../components/JoinUs';

export default function JoinUsPage() {
  return (
    <div className="pt-20">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <JoinUs />
      </motion.div>
      <Footer />
    </div>
  );
}
