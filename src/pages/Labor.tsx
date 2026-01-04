import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle, AlertCircle, Briefcase, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Labor() {
  const { data, isLoading, error } = useData();
  const prefersReducedMotion = useReducedMotion();
  const { t, i18n } = useTranslation();

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

  const { labor_market, minimum_wage } = data;

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
            <h1 className="text-display mb-4">{t('labor.title')}</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              {t('labor.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Insight Banner */}
      <section className="py-8">
        <div className="container-wide">
          <div className="glass-card p-6 border-l-4 border-accent">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('labor.keyInsight.title')}</h3>
                <p className="text-muted-foreground">
                  {t('labor.keyInsight.description', {
                    percent: labor_market.working_poor_percentage_of_employed,
                    informality: labor_market.informality_rate_percentage
                  })}
                </p>
              </div>
              <SourceDrawer sourceIds={labor_market.source_ids} title={t('labor.dataTitle')} />
            </div>
          </div>
        </div>
      </section>

      {/* Main KPIs */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('labor.employmentOverview.title')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              value={labor_market.employed_population_millions}
              label={t('labor.employmentOverview.employedPopulation')}
              suffix={` ${t('labor.employmentOverview.million')}`}
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition={t('labor.employmentOverview.employedPopulationDesc')}
              variant="insight"
            />
            <KPICard
              value={labor_market.employment_rate_percentage}
              label={t('labor.employmentOverview.employmentRate')}
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition={t('labor.employmentOverview.employmentRateDesc')}
              variant="insight"
            />
            <KPICard
              value={labor_market.unemployment_rate_percentage}
              label={t('labor.employmentOverview.unemploymentRate')}
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition={t('labor.employmentOverview.unemploymentRateDesc')}
              variant="neutral"
            />
          </div>
        </div>
      </section>

      {/* Informality & Working Poor */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('labor.laborChallenges.title')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              value={labor_market.informality_rate_percentage}
              label={t('labor.laborChallenges.informalityRate')}
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition={t('labor.laborChallenges.informalityRateDesc')}
              variant="deficit"
            />
            <KPICard
              value={labor_market.working_poor_percentage_of_employed}
              label={t('labor.laborChallenges.workingPoor')}
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition={t('labor.laborChallenges.workingPoorDesc')}
              variant="deficit"
            />
            <KPICard
              value={labor_market.income_mass_monthly_brl_billions}
              label={t('labor.laborChallenges.monthlyIncomeMass')}
              prefix="R$ "
              suffix="B"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition={t('labor.laborChallenges.totalMonthlyIncome')}
              variant="insight"
            />
          </div>
        </div>
      </section>

      {/* Minimum Wage */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">{t('labor.minimumWage.title')}</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">{t('labor.minimumWage.evolutionChart')}</h3>
                <SourceDrawer sourceIds={minimum_wage.source_ids} title={t('labor.minimumWage.title')} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">2025</p>
                  <p className="text-2xl font-bold">R$ {minimum_wage.wage_2025_brl.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">2026</p>
                  <p className="text-2xl font-bold text-secondary">R$ {minimum_wage.wage_2026_brl.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span>
                  {t('labor.minimumWage.increase')} R$ {(minimum_wage.wage_2026_brl - minimum_wage.wage_2025_brl).toLocaleString()}
                  ({(((minimum_wage.wage_2026_brl - minimum_wage.wage_2025_brl) / minimum_wage.wage_2025_brl) * 100).toFixed(1)}%)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t('labor.minimumWage.effectiveDate')} {new Date(minimum_wage.effective_date_2026).toLocaleDateString(i18n.language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">{t('labor.minimumWage.populationImpact')}</h3>
                <SourceDrawer sourceIds={minimum_wage.source_ids} title={t('labor.minimumWage.title')} />
              </div>
              
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-4">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <p className="text-4xl font-bold text-accent mb-2">
                  {minimum_wage.population_affected_millions.toFixed(1)}M
                </p>
                <p className="text-muted-foreground">
                  {t('labor.minimumWage.braziliansAffected')}
                </p>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <p className="text-sm text-muted-foreground text-center">
                  {t('labor.minimumWage.includesIndexed')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Summary */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <div className="glass-card p-8">
            <h3 className="font-semibold text-lg mb-6 text-center">{t('labor.atAGlance.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Briefcase className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">{labor_market.employed_population_millions}M</p>
                <p className="text-sm text-muted-foreground">{t('labor.atAGlance.employed')}</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">{labor_market.unemployment_rate_percentage}%</p>
                <p className="text-sm text-muted-foreground">{t('labor.atAGlance.unemployed')}</p>
              </div>
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <p className="text-2xl font-bold">{labor_market.informality_rate_percentage}%</p>
                <p className="text-sm text-muted-foreground">{t('labor.atAGlance.informal')}</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">R${minimum_wage.wage_2026_brl}</p>
                <p className="text-sm text-muted-foreground">{t('labor.atAGlance.minWage2026')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
