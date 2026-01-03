import { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Home, BarChart3, DollarSign, Shield, MapPin, Users, 
  Briefcase, Coins, Calculator, BookOpen, Database, Archive 
} from 'lucide-react';

export interface Chapter {
  id: string;
  labelKey: string;
  icon: typeof Home;
}

export const chapters: Chapter[] = [
  { id: 'home', labelKey: 'nav.home', icon: Home },
  { id: 'truth', labelKey: 'nav.truth', icon: BarChart3 },
  { id: 'poverty-lines', labelKey: 'narrative.povertyLines', icon: DollarSign },
  { id: 'safety-net', labelKey: 'narrative.safetyNet', icon: Shield },
  { id: 'regional', labelKey: 'narrative.regional', icon: MapPin },
  { id: 'racial', labelKey: 'narrative.racial', icon: Users },
  { id: 'labor', labelKey: 'nav.labor', icon: Briefcase },
  { id: 'wealth', labelKey: 'nav.wealth', icon: Coins },
  { id: 'simulator', labelKey: 'nav.simulator', icon: Calculator },
  { id: 'methodology', labelKey: 'nav.methodology', icon: BookOpen },
  { id: 'data', labelKey: 'nav.dataExplorer', icon: Database },
  { id: 'deprecated', labelKey: 'nav.deprecated', icon: Archive },
];

// Map routes to section IDs
export const routeToSection: Record<string, string> = {
  '/': 'home',
  '/truth': 'truth',
  '/poverty': 'poverty-lines',
  '/labor': 'labor',
  '/wealth': 'wealth',
  '/simulator': 'simulator',
  '/methodology': 'methodology',
  '/data': 'data',
  '/deprecated': 'deprecated',
};

// Map section IDs to routes
export const sectionToRoute: Record<string, string> = {
  'home': '/',
  'truth': '/truth',
  'poverty-lines': '/poverty',
  'safety-net': '/poverty',
  'regional': '/poverty',
  'racial': '/poverty',
  'labor': '/labor',
  'wealth': '/wealth',
  'simulator': '/simulator',
  'methodology': '/methodology',
  'data': '/data',
  'deprecated': '/deprecated',
};

interface ChapterNavProps {
  activeSection: string;
  onChapterClick: (sectionId: string) => void;
}

interface MobileNavButtonProps {
  chapter: Chapter;
  isActive: boolean;
  onClick: () => void;
}

function MobileNavButton({ chapter, isActive, onClick }: MobileNavButtonProps) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const Icon = chapter.icon;

  // Scroll active button into view
  useEffect(() => {
    if (isActive && buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [isActive]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      className={`relative flex items-center justify-center p-2 rounded-full transition-all flex-shrink-0 ${
        isActive
          ? 'bg-secondary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
      aria-label={t(chapter.labelKey)}
      aria-current={isActive ? 'location' : undefined}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />

      {isActive && (
        <motion.div
          layoutId="activeMobileChapter"
          className="absolute inset-0 bg-secondary rounded-full -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

export function ChapterNav({ activeSection, onChapterClick }: ChapterNavProps) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Chapter Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : -20,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1 bg-background/90 backdrop-blur-xl rounded-xl px-2 pt-2 pb-8 border border-border/50 shadow-xl max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide"
        aria-label="Chapter navigation"
      >
        {chapters.map((chapter) => {
          const isActive = activeSection === chapter.id;
          const Icon = chapter.icon;

          return (
            <motion.button
              key={chapter.id}
              onClick={() => onChapterClick(chapter.id)}
              className={`group relative flex items-center gap-2 p-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-secondary text-primary-foreground shadow-md scale-105'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground hover:scale-105'
              }`}
              aria-label={t(chapter.labelKey)}
              aria-current={isActive ? 'location' : undefined}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} />

              {isActive && (
                <motion.div
                  layoutId="activeChapter"
                  className="absolute inset-0 bg-secondary/20 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-popover text-popover-foreground text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {t(chapter.labelKey)}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 xl:hidden bg-background/90 backdrop-blur-xl rounded-full px-4 py-2 border border-border/50 shadow-xl max-w-[calc(100vw-2rem)]"
        aria-label="Mobile chapter navigation"
      >
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 scroll-px-4">
          {chapters.filter(ch => ch.id !== 'deprecated').map((chapter) => (
            <MobileNavButton
              key={chapter.id}
              chapter={chapter}
              isActive={activeSection === chapter.id}
              onClick={() => onChapterClick(chapter.id)}
            />
          ))}
        </div>
      </motion.nav>
    </>
  );
}
