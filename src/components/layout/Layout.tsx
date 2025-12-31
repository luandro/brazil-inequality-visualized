import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeOut' as const,
  duration: 0.3,
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="pt-16"
      >
        {children}
      </motion.main>
      <footer className="border-t border-border/50 mt-20">
        <div className="container-wide py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-caption text-center md:text-left">
              Data sourced from official Brazilian government statistics and international organizations.
              All figures are validated and sourced.
            </p>
            <p className="text-caption">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
