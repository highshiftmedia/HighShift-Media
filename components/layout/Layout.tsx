import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingOrbs, GridPattern } from '../ui/FloatingElements';
import { WhatsAppIcon } from '../../constants';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showBackground?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showFooter = true,
  showBackground = true
}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      {/* Background effects */}
      {showBackground && (
        <>
          <FloatingOrbs />
          <GridPattern />
        </>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* Floating WhatsApp button */}
      <motion.a
        href="https://Wa.me/+16307033569"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center gap-3 group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-semibold text-sm">
          Chat with us
        </span>
        <WhatsAppIcon />
      </motion.a>
    </div>
  );
};
