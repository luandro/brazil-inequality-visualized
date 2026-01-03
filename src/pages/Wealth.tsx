import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle, Info, TrendingUp, Users, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Wealth() {
  const { data, isLoading, error } = useData();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="glass-card p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive">{error || t('common.failedToLoad')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const { wealth } = data;

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <h1 className="text-display mb-4">{t('wealth.title')}</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              {t('wealth.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Measurement Notes */}
      <section className="py-8">
        <div className="container-wide">
          <div className="glass-card p-6 border-l-4 border-accent">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('wealth.measurementNotes')}</h3>
                <p className="text-muted-foreground">{t('wealth.measurementNotesText')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wealth Gini */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('wealth.wealthInequality.title')}</h2>
          </motion.div>

          <div className="glass-card p-8 max-w-md">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-6xl font-bold text-destructive">{wealth.wealth_gini_coefficient.toFixed(2)}</p>
                <SourceDrawer
                  sourceIds={wealth.source_ids}
                  title={t('wealth.wealthInequality.wealthGini')}
                  definition={t('wealth.wealthInequality.wealthGiniDefinition')}
                  showLabel={false}
                />
              </div>
              <p className="text-lg font-medium mb-4">{t('wealth.wealthInequality.wealthGini')}</p>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary via-accent to-destructive"
                  style={{ width: `${wealth.wealth_gini_coefficient * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{t('wealth.wealthInequality.equal')}</span>
                <span>{t('wealth.wealthInequality.unequal')}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {t('wealth.wealthInequality.comparison', { gini: 0.518 })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Millionaires */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('wealth.millionairePopulation.title')}</h2>
            <p className="text-muted-foreground">
              {t('wealth.millionairePopulation.description', { threshold: wealth.millionaire_population.threshold_usd.toLocaleString() })}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              value={wealth.millionaire_population.count_individuals / 1000}
              label={t('wealth.millionairePopulation.totalMillionaires')}
              suffix="K"
              decimals={0}
              sourceIds={wealth.millionaire_population.source_ids}
              definition={t('wealth.millionairePopulation.individualsAbove', { threshold: (wealth.millionaire_population.threshold_usd / 1000000).toFixed(0) })}
              variant="neutral"
            />
            <KPICard
              value={wealth.millionaire_population.percentage_of_population}
              label={t('wealth.millionairePopulation.shareOfPopulation')}
              suffix="%"
              decimals={1}
              sourceIds={wealth.millionaire_population.source_ids}
              definition={t('wealth.millionairePopulation.millionairePercentage')}
              variant="neutral"
            />
            <KPICard
              value={wealth.millionaire_population.estimated_wealth_share_percentage}
              label={t('wealth.millionairePopulation.wealthShare')}
              suffix="%"
              decimals={1}
              sourceIds={wealth.millionaire_population.source_ids}
              definition={t('wealth.millionairePopulation.wealthHeldByMillionaires')}
              variant="deficit"
            />
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-medium">{t('wealth.millionairePopulation.concentrationRatio')}</h4>
                <SourceDrawer sourceIds={wealth.millionaire_population.source_ids} title={t('wealth.millionairePopulation.title')} />
              </div>
              <p className="text-3xl font-bold text-destructive">
                {(wealth.millionaire_population.estimated_wealth_share_percentage / wealth.millionaire_population.percentage_of_population).toFixed(0)}x
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {t('wealth.millionairePopulation.populationHolds', {
                  percent: wealth.millionaire_population.percentage_of_population,
                  wealth: wealth.millionaire_population.estimated_wealth_share_percentage
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Billionaires */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('wealth.billionairePopulation.title')}</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">{t('wealth.billionairePopulation.countTrend')}</h3>
                <SourceDrawer sourceIds={wealth.billionaire_population.source_ids} title={t('wealth.billionairePopulation.dataTitle')} />
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-3">
                    <Coins className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-4xl font-bold">{wealth.billionaire_population.count_2024}</p>
                  <p className="text-muted-foreground">2024</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-3">
                    <Coins className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-4xl font-bold text-accent">{wealth.billionaire_population.count_2025}</p>
                  <p className="text-muted-foreground">2025</p>
                </div>
              </div>

              <div className="p-4 bg-secondary/10 rounded-lg flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span>
                  {t('wealth.billionairePopulation.yearOverYear', {
                    percent: ((wealth.billionaire_population.count_2025 - wealth.billionaire_population.count_2024) / wealth.billionaire_population.count_2024 * 100).toFixed(1)
                  })}
                </span>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">{t('wealth.billionairePopulation.additionalNotes')}</h3>
                <SourceDrawer sourceIds={wealth.billionaire_population.source_ids} title={t('wealth.billionairePopulation.dataTitle')} />
              </div>
              
              <p className="text-muted-foreground mb-6">
                {wealth.billionaire_population.combined_wealth_usd_billions_2025 != null
                  ? t('wealth.billionairePopulation.notesText', { wealth: wealth.billionaire_population.combined_wealth_usd_billions_2025, year: 2025 })
                  : wealth.billionaire_population.notes}
              </p>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">{t('wealth.billionairePopulation.contextTitle')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('wealth.billionairePopulation.context')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <div className="glass-card p-8 md:p-12 text-center">
            <h3 className="font-semibold text-lg md:text-xl mb-8 md:mb-12">{t('wealth.wealthGapVisualized.title')}</h3>

            <div className="flex items-end justify-center gap-12 md:gap-16 lg:gap-20 h-64 md:h-80 lg:h-96 mb-8">
              <div className="text-center">
                <div
                  className="w-20 md:w-24 lg:w-32 bg-gradient-to-t from-destructive to-red-400 rounded-t-lg mx-auto mb-4 transition-transform hover:scale-105 cursor-pointer"
                  style={{ height: `${wealth.millionaire_population.estimated_wealth_share_percentage * 4}px` }}
                />
                <p className="font-bold text-lg md:text-xl">{wealth.millionaire_population.estimated_wealth_share_percentage}%</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2">{t('wealth.wealthGapVisualized.wealthHeldBy')}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{t('wealth.wealthGapVisualized.millionaires')}</p>
              </div>

              <div className="text-center">
                <div
                  className="w-20 md:w-24 lg:w-32 bg-gradient-to-t from-secondary to-cyan-400 rounded-t-lg mx-auto mb-4 transition-transform hover:scale-105 cursor-pointer"
                  style={{ height: `${(100 - wealth.millionaire_population.estimated_wealth_share_percentage) * 4}px` }}
                />
                <p className="font-bold text-lg md:text-xl">{(100 - wealth.millionaire_population.estimated_wealth_share_percentage).toFixed(1)}%</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2">{t('wealth.wealthGapVisualized.wealthHeldBy')}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{t('wealth.wealthGapVisualized.everyoneElse')}</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              {t('wealth.wealthGapVisualized.description', { percent: wealth.millionaire_population.percentage_of_population })}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
