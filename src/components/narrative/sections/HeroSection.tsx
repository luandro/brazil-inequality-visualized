import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Calculator, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { NarrativeSection } from '../NarrativeSection';

interface HeroSectionProps {
  onScrollDown?: () => void;
}

export function HeroSection({ onScrollDown }: HeroSectionProps) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <NarrativeSection id="home" ariaLabel="Home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-20 right-0 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container-wide relative py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="w-full sm:max-w-4xl"
        >
          <h1 className="text-hero mb-6 overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="text-foreground tracking-tight whitespace-nowrap">{t('home.hero.truth')}</span>
              <span className="text-secondary whitespace-nowrap">→</span>
              <span className="text-foreground tracking-tight whitespace-nowrap">{t('home.hero.choices')}</span>
              <span className="text-secondary whitespace-nowrap">→</span>
              <span className="text-foreground tracking-tight whitespace-nowrap">{t('home.hero.consequences')}</span>
            </div>
          </h1>

          <p className="text-body-lg text-muted-foreground max-w-2xl mb-10">
            {t('home.hero.description')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={onScrollDown}
              size="lg" 
              className="gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              {t('home.hero.exploreReality')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/simulator">
                <Calculator className="w-5 h-5" />
                {t('home.hero.runSimulations')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={onScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: prefersReducedMotion ? 0 : 0.5 }}
        aria-label={t('home.hero.scrollToExplore')}
      >
        <span className="text-xs font-medium uppercase tracking-wider text-center">{t('home.hero.scrollToExplore')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </NarrativeSection>
  );
}
