import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { ComparisonBar } from '@/components/charts/ComparisonBar';
import { RegionalChart } from '@/components/charts/RegionalChart';
import { RacialChart } from '@/components/charts/RacialChart';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Truth() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useData();
  const prefersReducedMotion = useReducedMotion();

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

  const { poverty, wealth } = data;

  // Calculate population distribution segments
  const extremePovertyPct = poverty.official_key_statistics.extreme_poverty_rate_percentage;
  const povertyNonExtremePct = poverty.official_key_statistics.poverty_rate_percentage - extremePovertyPct;
  const abovePovertyPct = 100 - poverty.official_key_statistics.poverty_rate_percentage;

  // Ultra-wealth segments
  const multiMillionairePct = wealth.millionaire_population.multi_millionaire_percentage_of_population || 0;
  const billionairePct = (wealth.billionaire_population.count_2025 / (data.metadata.population_total_millions * 1000000)) * 100;

  // Adjust above-poverty to account for ultra-wealth
  const abovePovertyAdjusted = abovePovertyPct - multiMillionairePct - billionairePct;

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
            <h1 className="text-display mb-4">{t('truth.title')}</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              {t('truth.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section A: Poverty at a Glance */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('truth.sectionA.title')}</h2>
            <p className="text-muted-foreground">
              {t('truth.sectionA.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              value={poverty.official_key_statistics.poverty_rate_percentage}
              label={t('truth.sectionA.povertyRate')}
              suffix="%"
              sourceIds={poverty.official_key_statistics.source_ids}
              definition={t('truth.sectionA.povertyRateDesc')}
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.poverty_population_millions}
              label={t('truth.sectionA.peopleInPoverty')}
              suffix="M"
              sourceIds={poverty.official_key_statistics.source_ids}
              definition={t('truth.sectionA.peopleInPovertyDesc')}
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.extreme_poverty_rate_percentage}
              label={t('truth.sectionA.extremePovertyRate')}
              suffix="%"
              sourceIds={poverty.official_key_statistics.source_ids}
              definition={t('truth.sectionA.extremePovertyRateDesc')}
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.gini_coefficient}
              label={t('truth.sectionA.incomeGini')}
              decimals={3}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition={t('truth.sectionA.incomeGiniDesc')}
              variant="neutral"
            />
          </div>

          {/* Enhanced Population Distribution with Wealth Extremes */}
          <div className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold">{t('truth.sectionA.populationDistribution')}</h3>
              <SourceDrawer
                sourceIds={[
                  ...poverty.official_key_statistics.source_ids,
                  ...wealth.millionaire_population.source_ids,
                  ...wealth.billionaire_population.source_ids
                ]}
                title={t('truth.sectionA.populationDistribution')}
              />
            </div>

            <div className="h-16 rounded-lg overflow-hidden flex border border-border">
              {/* Extreme Poverty */}
              <div
                className="bg-gradient-to-r from-destructive to-red-400 flex items-center justify-center text-xs font-medium text-destructive-foreground transition-all hover:brightness-110"
                style={{ width: `${extremePovertyPct}%` }}
                title={`${extremePovertyPct.toFixed(2)}% - ${t('truth.sectionA.extremePoverty')}`}
              >
                {extremePovertyPct > 3 && `${extremePovertyPct.toFixed(1)}%`}
              </div>

              {/* Poverty (Non-Extreme) */}
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-center text-xs font-medium text-primary transition-all hover:brightness-110"
                style={{ width: `${povertyNonExtremePct}%` }}
                title={`${povertyNonExtremePct.toFixed(2)}% - ${t('truth.sectionA.povertyNonExtreme')}`}
              >
                {povertyNonExtremePct > 3 && `${povertyNonExtremePct.toFixed(1)}%`}
              </div>

              {/* Above Poverty (Adjusted) */}
              <div
                className="bg-gradient-to-r from-secondary to-cyan-400 flex items-center justify-center text-xs font-medium text-primary transition-all hover:brightness-110"
                style={{ width: `${abovePovertyAdjusted}%` }}
                title={`${abovePovertyAdjusted.toFixed(2)}% - ${t('truth.sectionA.abovePovertyLine')}`}
              >
                {abovePovertyAdjusted.toFixed(1)}%
              </div>

              {/* Multi-Millionaires */}
              {multiMillionairePct > 0 && (
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-300 flex items-center justify-center text-xs font-bold text-primary border-l-2 border-primary transition-all hover:brightness-110"
                  style={{ width: `${Math.max(multiMillionairePct, 0.5)}%`, minWidth: '60px' }}
                  title={`${multiMillionairePct.toFixed(3)}% - ${t('truth.sectionA.multiMillionaires')} (${wealth.millionaire_population.multi_millionaire_count_individuals?.toLocaleString()} people)`}
                >
                  <span className="truncate px-1">{multiMillionairePct < 0.1 ? `<0.1%` : `${multiMillionairePct.toFixed(2)}%`}</span>
                </div>
              )}

              {/* Billionaires */}
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center text-xs font-bold text-primary-foreground border-l-2 border-primary transition-all hover:brightness-110"
                style={{ width: `${Math.max(billionairePct, 0.3)}%`, minWidth: '80px' }}
                title={`${billionairePct.toFixed(5)}% - ${t('truth.sectionA.billionaires')} (${wealth.billionaire_population.count_2025} people)`}
              >
                <span className="truncate px-1">{wealth.billionaire_population.count_2025}</span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-destructive to-red-400" />
                <span className="text-muted-foreground">{t('truth.sectionA.extremePoverty')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-amber-500 to-amber-400" />
                <span className="text-muted-foreground">{t('truth.sectionA.povertyNonExtreme')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-secondary to-cyan-400" />
                <span className="text-muted-foreground">{t('truth.sectionA.abovePovertyLine')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 to-yellow-300 border border-primary" />
                <span className="text-muted-foreground">{t('truth.sectionA.multiMillionaires')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-600 to-purple-400 border border-primary" />
                <span className="text-muted-foreground">{t('truth.sectionA.billionaires')}</span>
              </div>
            </div>

            {/* Insight Note */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
              <strong>Note:</strong> Ultra-wealth segments (multi-millionaires and billionaires) are visually enlarged for visibility.
              Actual percentages: Multi-millionaires {multiMillionairePct.toFixed(3)}%, Billionaires {billionairePct.toFixed(5)}%.
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Poverty Lines */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('truth.sectionB.title')}</h2>
            <p className="text-muted-foreground">
              {t('truth.sectionB.description')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-destructive">{t('truth.sectionB.extremePovertyLine')}</h3>
                <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title={t('truth.sectionB.title')} />
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="chip-deficit">
                  ${poverty.poverty_lines.extreme_poverty_daily_usd_ppp.toFixed(2)}{t('truth.sectionB.perDayPPP')}
                </span>
                <span className="chip-deficit">
                  R${poverty.poverty_lines.extreme_poverty_monthly_brl}{t('truth.sectionB.perMonth')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {t('truth.sectionB.extremePovertyLineDesc')}
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-accent">{t('truth.sectionB.povertyLine')}</h3>
                <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title={t('truth.sectionB.title')} />
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="chip-neutral">
                  ${poverty.poverty_lines.poverty_daily_usd_ppp.toFixed(2)}{t('truth.sectionB.perDayPPP')}
                </span>
                <span className="chip-neutral">
                  R${poverty.poverty_lines.poverty_monthly_brl}{t('truth.sectionB.perMonth')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {t('truth.sectionB.povertyLineDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: Safety Net Counterfactual */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('truth.sectionC.title')}</h2>
            <p className="text-muted-foreground">
              {t('truth.sectionC.description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ComparisonBar
              title={t('truth.sectionC.povertyRateChart')}
              beforeLabel={t('truth.sectionC.withoutPrograms')}
              beforeValue={poverty.social_programs_counterfactuals.poverty_rate_without_programs_percentage}
              afterLabel={t('truth.sectionC.current')}
              afterValue={poverty.official_key_statistics.poverty_rate_percentage}
              sourceIds={poverty.social_programs_counterfactuals.source_ids}
            />
            <ComparisonBar
              title={t('truth.sectionC.extremePovertyChart')}
              beforeLabel={t('truth.sectionC.withoutPrograms')}
              beforeValue={poverty.social_programs_counterfactuals.extreme_poverty_rate_without_programs_percentage}
              afterLabel={t('truth.sectionC.current')}
              afterValue={poverty.official_key_statistics.extreme_poverty_rate_percentage}
              sourceIds={poverty.social_programs_counterfactuals.source_ids}
            />
          </div>
        </div>
      </section>

      {/* Section D: Regional Inequality */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('truth.sectionD.title')}</h2>
            <p className="text-muted-foreground">
              {t('truth.sectionD.description')}
            </p>
          </motion.div>

          <RegionalChart data={poverty.regional_distribution} title={t('truth.sectionD.chartTitle')} />
        </div>
      </section>

      {/* Section E: Racial Inequality */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('truth.sectionE.title')}</h2>
            <p className="text-muted-foreground">
              {t('truth.sectionE.description')}
            </p>
          </motion.div>

          <RacialChart data={poverty.racial_distribution} title={t('truth.sectionE.chartTitle')} />
        </div>
      </section>
    </Layout>
  );
}
