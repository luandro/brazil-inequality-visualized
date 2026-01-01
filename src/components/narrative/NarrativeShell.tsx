import { useData } from '@/context/DataContext';
import { Navigation } from '@/components/layout/Navigation';
import { ChapterNav } from './ChapterNav';
import { useScrollSync } from './useScrollSync';
import { HeroSection } from './sections/HeroSection';
import { InequalityGlanceSection } from './sections/InequalityGlanceSection';
import { PovertyLinesSection } from './sections/PovertyLinesSection';
import { SafetyNetSection } from './sections/SafetyNetSection';
import { RegionalSection } from './sections/RegionalSection';
import { RacialSection } from './sections/RacialSection';
import { LaborSection } from './sections/LaborSection';
import { WealthSection } from './sections/WealthSection';
import { SimulatorSection } from './sections/SimulatorSection';
import { MethodologySection } from './sections/MethodologySection';
import { DataExplorerSection } from './sections/DataExplorerSection';
import { DeprecatedSection } from './sections/DeprecatedSection';
import { TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NarrativeShell() {
  const { t, i18n } = useTranslation();
  const { data, isLoading, error } = useData();
  const { activeSection, scrollToSection } = useScrollSync();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-lg text-center glass-card p-8">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <TrendingDown className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('common.dataValidationError')}</h1>
          <p className="text-muted-foreground mb-4">{t('common.dataValidationErrorDesc')}</p>
          <pre className="text-left text-xs bg-muted p-4 rounded-lg overflow-auto max-h-48 text-destructive">
            {error}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <ChapterNav activeSection={activeSection} onChapterClick={scrollToSection} />
      
      <main className="pt-16">
        <HeroSection onScrollDown={() => scrollToSection('truth')} />
        <InequalityGlanceSection />
        <PovertyLinesSection />
        <SafetyNetSection />
        <RegionalSection />
        <RacialSection />
        <LaborSection />
        <WealthSection />
        <SimulatorSection />
        <MethodologySection />
        <DataExplorerSection />
        <DeprecatedSection />
      </main>

      <footer className="border-t border-border/50 mt-20">
        <div className="container-wide py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-caption text-center md:text-left">
              {t('app.footer.dataSourced')}
            </p>
            <p className="text-caption">
              {t('app.footer.lastUpdated')} {new Date().toLocaleDateString(i18n.language, { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
