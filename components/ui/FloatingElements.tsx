import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Check for reduced motion preference and mobile
const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    setShouldReduceMotion(mediaQuery.matches || isMobile);
    
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches || isMobile);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return shouldReduceMotion;
};

// Floating orbs for background decoration - optimized for mobile
export const FloatingOrbs: React.FC = memo(() => {
  const reduceMotion = useReducedMotion();
  
  // Static version for mobile/reduced motion
  if (reduceMotion) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
            top: '10%',
            left: '10%',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            top: '50%',
            right: '10%',
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary orb - optimized animation */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          top: '10%',
          left: '10%',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -80, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Secondary orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          top: '50%',
          right: '10%',
        }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
});
FloatingOrbs.displayName = 'FloatingOrbs';

// Grid background pattern - memoized
export const GridPattern: React.FC<{ className?: string }> = memo(({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, #020617 70%)',
        }}
      />
    </div>
  );
});
GridPattern.displayName = 'GridPattern';

// Animated particles - disabled on mobile for performance
export const Particles: React.FC<{ count?: number }> = memo(({ count = 15 }) => {
  const reduceMotion = useReducedMotion();
  
  // Don't render particles on mobile or reduced motion
  if (reduceMotion) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -20, 20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
});
Particles.displayName = 'Particles';

// Gradient text component - memoized
export const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}> = memo(({
  children,
  className = '',
  gradient = 'from-white via-white/90 to-white/60'
}) => {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
});
GradientText.displayName = 'GradientText';

// Animated counter - simplified
export const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  className?: string;
}> = memo(({ value, suffix = '', className = '' }) => {
  return (
    <span className={className}>
      {value}{suffix}
    </span>
  );
});
AnimatedCounter.displayName = 'AnimatedCounter';
