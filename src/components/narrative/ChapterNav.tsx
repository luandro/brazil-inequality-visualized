import { useEffect, useState, useCallback } from 'react';
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
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : -20,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1 bg-background/80 backdrop-blur-sm rounded-xl p-2 border border-border/50 shadow-lg"
      aria-label="Chapter navigation"
    >
      {chapters.map((chapter) => {
        const isActive = activeSection === chapter.id;
        const Icon = chapter.icon;

        return (
          <button
            key={chapter.id}
            onClick={() => onChapterClick(chapter.id)}
            className={`group relative flex items-center gap-2 p-2 rounded-lg transition-all ${
              isActive 
                ? 'bg-secondary text-primary-foreground' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            aria-label={t(chapter.labelKey)}
            aria-current={isActive ? 'location' : undefined}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t(chapter.labelKey)}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}
