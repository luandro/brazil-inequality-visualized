import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { ComparisonBar } from '@/components/charts/ComparisonBar';
import { RegionalChart } from '@/components/charts/RegionalChart';
import { RacialChart } from '@/components/charts/RacialChart';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { LiquidCircleImage } from '@/components/ui/LiquidCircleImage';
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

  // Calculate "100 people" metaphor counts (rounded for display)
  const per100ExtremePoverty = Math.round(extremePovertyPct);
  const per100Poverty = Math.round(povertyNonExtremePct);
  const per100AbovePoverty = Math.round(abovePovertyAdjusted);

  // Calculate comparative ratios
  const multiMillionaireRatio = Math.round(data.metadata.population_total_millions * 1000000 / (wealth.millionaire_population.multi_millionaire_count_individuals || 1));
  const billionaireRatio = Math.round(data.metadata.population_total_millions * 1000000 / wealth.billionaire_population.count_2025);

  // Calculate ultra-wealth in "per 100" scale
  const per100MultiMillionaire = (multiMillionairePct).toFixed(3);
  const per100Billionaire = (billionairePct).toFixed(5);

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
            <div className="relative">
              <div className="absolute left-0 top-0 -z-10">
                <LiquidCircleImage
                  src="/img/A.png"
                  alt=""
                  size={120}
                />
              </div>
              <div className="pl-8 pt-4">
                <h2 className="section-header">{t('truth.sectionA.title')}</h2>
                <p className="text-muted-foreground">
                  {t('truth.sectionA.description')}
                </p>
              </div>
            </div>
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

            {/* Main accurate graph */}
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

              {/* Multi-Millionaires - barely visible */}
              {multiMillionairePct > 0 && (
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-300 border-l-2 border-yellow-600 transition-all hover:brightness-110"
                  style={{ width: `${multiMillionairePct}%` }}
                  title={`${multiMillionairePct.toFixed(3)}% - ${t('truth.sectionA.multiMillionaires')} (${wealth.millionaire_population.multi_millionaire_count_individuals?.toLocaleString()} people)`}
                />
              )}

              {/* Billionaires - extremely tiny */}
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-400 border-l-2 border-purple-700 transition-all hover:brightness-110"
                style={{ width: `${billionairePct}%` }}
                title={`${billionairePct.toFixed(5)}% - ${t('truth.sectionA.billionaires')} (${wealth.billionaire_population.count_2025} people)`}
              />
            </div>

            {/* Ultra-Wealth Visualization: Multiple Perspectives */}
            <div className="mt-6 space-y-4">
              {/* Visual Metaphor: If 100 people represented Brazil */}
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">{t('truth.sectionA.hundredPeopleMetaphor')}</span>
                </div>

                <div className="space-y-3">
                  {/* Extreme Poverty */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5 flex-wrap">
                      {Array.from({ length: per100ExtremePoverty }).map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-destructive" title={t('truth.sectionA.extremePoverty')} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{t('truth.sectionA.inExtremePoverty', { count: per100ExtremePoverty })}</span>
                  </div>

                  {/* Poverty (Non-Extreme) */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5 flex-wrap">
                      {Array.from({ length: per100Poverty }).map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-amber-500" title={t('truth.sectionA.povertyNonExtreme')} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{t('truth.sectionA.inPoverty', { count: per100Poverty })}</span>
                  </div>

                  {/* Above Poverty */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5 flex-wrap max-w-xl">
                      {Array.from({ length: per100AbovePoverty }).map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-secondary" title={t('truth.sectionA.abovePovertyLine')} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{t('truth.sectionA.abovePoverty', { count: per100AbovePoverty })}</span>
                  </div>

                  {/* Ultra-Wealth - The shocking part */}
                  <div className="mt-4 p-3 bg-accent/10 rounded border-l-4 border-accent">
                    <div className="flex items-start gap-3">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 border-2 border-yellow-600 animate-pulse" title={t('truth.sectionA.multiMillionaires')} />
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 border-2 border-purple-700 animate-pulse" title={t('truth.sectionA.billionaires')} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold mb-1">{t('truth.sectionA.ultraWealthInvisible')}</p>
                        <p className="text-xs text-muted-foreground">
                          {t('truth.sectionA.ultraWealthDetail', {
                            multiCount: per100MultiMillionaire,
                            multiRatio: multiMillionaireRatio.toLocaleString(),
                            billCount: per100Billionaire,
                            billRatio: billionaireRatio.toLocaleString()
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparative Numbers */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-300/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">{t('truth.sectionA.multiMillionaires')}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{wealth.millionaire_population.multi_millionaire_count_individuals?.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{t('truth.sectionA.peopleWithNetWorth', { threshold: '10M' })}</div>
                  <div className="mt-2 pt-2 border-t border-yellow-500/20">
                    <div className="text-xs font-medium">{t('truth.sectionA.oneInEvery', { ratio: multiMillionaireRatio.toLocaleString() })}</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-600/10 to-purple-400/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-50" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">{t('truth.sectionA.billionaires')}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{wealth.billionaire_population.count_2025}</div>
                  <div className="text-xs text-muted-foreground">{t('truth.sectionA.peopleWithNetWorth', { threshold: '1B' })}</div>
                  <div className="mt-2 pt-2 border-t border-purple-500/20">
                    <div className="text-xs font-medium">{t('truth.sectionA.oneInEvery', { ratio: billionaireRatio.toLocaleString() })}</div>
                  </div>
                </div>
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
            <div className="mt-4 p-3 bg-accent/10 rounded-lg text-xs border-l-4 border-accent">
              <p className="font-semibold mb-1">{t('truth.sectionA.scaleOfInequality')}</p>
              <p className="text-muted-foreground">
                {t('truth.sectionA.scaleDescription', { percent: (multiMillionairePct + billionairePct).toFixed(3) })}
              </p>
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
            <div className="relative">
              <div className="absolute left-0 top-0 -z-10">
                <LiquidCircleImage
                  src="/img/B.png"
                  alt=""
                  size={120}
                />
              </div>
              <div className="pl-8 pt-4">
                <h2 className="section-header">{t('truth.sectionB.title')}</h2>
                <p className="text-muted-foreground">
                  {t('truth.sectionB.description')}
                </p>
              </div>
            </div>
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
            <div className="relative">
              <div className="absolute left-0 top-0 -z-10">
                <LiquidCircleImage
                  src="/img/C.png"
                  alt=""
                  size={120}
                />
              </div>
              <div className="pl-8 pt-4">
                <h2 className="section-header">{t('truth.sectionC.title')}</h2>
                <p className="text-muted-foreground">
                  {t('truth.sectionC.description')}
                </p>
              </div>
            </div>
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
            <div className="relative">
              <div className="absolute left-0 top-0 -z-10">
                <LiquidCircleImage
                  src="/img/D.png"
                  alt=""
                  size={120}
                />
              </div>
              <div className="pl-8 pt-4">
                <h2 className="section-header">{t('truth.sectionD.title')}</h2>
                <p className="text-muted-foreground">
                  {t('truth.sectionD.description')}
                </p>
              </div>
            </div>
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
            <div className="relative">
              <div className="absolute left-0 top-0 -z-10">
                <LiquidCircleImage
                  src="/img/E.png"
                  alt=""
                  size={120}
                />
              </div>
              <div className="pl-8 pt-4">
                <h2 className="section-header">{t('truth.sectionE.title')}</h2>
                <p className="text-muted-foreground">
                  {t('truth.sectionE.description')}
                </p>
              </div>
            </div>
          </motion.div>

          <RacialChart data={poverty.racial_distribution} title={t('truth.sectionE.chartTitle')} />
        </div>
      </section>
    </Layout>
  );
}
