import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingOrbs, GridPattern } from '../ui/FloatingElements';
import { GlobalChatbot } from '../GlobalChatbot';
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

      {/* Global AI Chatbot */}
      <GlobalChatbot />
    </div>
  );
};
