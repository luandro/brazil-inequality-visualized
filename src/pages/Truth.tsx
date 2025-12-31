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

  const { poverty } = data;

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

          {/* Stacked visualization */}
          <div className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold">{t('truth.sectionA.populationDistribution')}</h3>
              <SourceDrawer sourceIds={poverty.official_key_statistics.source_ids} title={t('truth.sectionA.populationDistribution')} />
            </div>
            <div className="h-12 rounded-lg overflow-hidden flex">
              <div
                className="bg-gradient-to-r from-destructive to-red-400 flex items-center justify-center text-xs font-medium text-destructive-foreground"
                style={{ width: `${poverty.official_key_statistics.extreme_poverty_rate_percentage}%` }}
              >
                {poverty.official_key_statistics.extreme_poverty_rate_percentage.toFixed(1)}%
              </div>
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-center text-xs font-medium text-primary"
                style={{
                  width: `${poverty.official_key_statistics.poverty_rate_percentage - poverty.official_key_statistics.extreme_poverty_rate_percentage}%`,
                }}
              >
                {(poverty.official_key_statistics.poverty_rate_percentage - poverty.official_key_statistics.extreme_poverty_rate_percentage).toFixed(1)}%
              </div>
              <div className="bg-gradient-to-r from-secondary to-cyan-400 flex-1 flex items-center justify-center text-xs font-medium text-primary">
                {(100 - poverty.official_key_statistics.poverty_rate_percentage).toFixed(1)}%
              </div>
            </div>
            <div className="flex justify-between mt-3 text-sm text-muted-foreground">
              <span>{t('truth.sectionA.extremePoverty')}</span>
              <span>{t('truth.sectionA.povertyNonExtreme')}</span>
              <span>{t('truth.sectionA.abovePovertyLine')}</span>
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
                  ${poverty.poverty_lines.extreme_poverty_daily_usd_ppp.toFixed(2)}/day PPP
                </span>
                <span className="chip-deficit">
                  R${poverty.poverty_lines.extreme_poverty_monthly_brl}/month
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
                  ${poverty.poverty_lines.poverty_daily_usd_ppp.toFixed(2)}/day PPP
                </span>
                <span className="chip-neutral">
                  R${poverty.poverty_lines.poverty_monthly_brl}/month
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
