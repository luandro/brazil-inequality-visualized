import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { ComparisonBar } from '@/components/charts/ComparisonBar';
import { RegionalChart } from '@/components/charts/RegionalChart';
import { RacialChart } from '@/components/charts/RacialChart';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle } from 'lucide-react';

export default function Truth() {
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
            <p className="text-destructive">{error || 'Failed to load data'}</p>
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
            <h1 className="text-display mb-4">Reality Dashboard</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              A comprehensive view of Brazil's inequality through verified data. Every metric
              is sourced from official government statistics and international organizations.
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
            <h2 className="section-header">A. Poverty at a Glance</h2>
            <p className="text-muted-foreground">
              Key indicators showing the current state of poverty in Brazil.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              value={poverty.official_key_statistics.poverty_rate_percentage}
              label="Poverty Rate"
              suffix="%"
              sourceIds={poverty.official_key_statistics.source_ids}
              definition="Share of population living below $6.85/day (2017 PPP)"
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.poverty_population_millions}
              label="People in Poverty"
              suffix="M"
              sourceIds={poverty.official_key_statistics.source_ids}
              definition="Total number of Brazilians living below the poverty line"
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.extreme_poverty_rate_percentage}
              label="Extreme Poverty Rate"
              suffix="%"
              sourceIds={poverty.official_key_statistics.source_ids}
              definition="Share living below $2.15/day (2017 PPP)"
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.gini_coefficient}
              label="Income Gini"
              decimals={3}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition="0 = perfect equality, 1 = maximum inequality"
              variant="neutral"
            />
          </div>

          {/* Stacked visualization */}
          <div className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold">Population Distribution</h3>
              <SourceDrawer sourceIds={poverty.official_key_statistics.source_ids} title="Population Distribution" />
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
              <span>Extreme poverty</span>
              <span>Poverty (non-extreme)</span>
              <span>Above poverty line</span>
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
            <h2 className="section-header">B. Poverty Lines</h2>
            <p className="text-muted-foreground">
              International thresholds used to measure poverty in Brazil.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-destructive">Extreme Poverty Line</h3>
                <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title="Poverty Lines" />
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
                World Bank international extreme poverty line (2017 PPP)
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-accent">Poverty Line</h3>
                <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title="Poverty Lines" />
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
                Upper-middle-income country poverty line (2017 PPP)
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
            <h2 className="section-header">C. Safety Net Impact</h2>
            <p className="text-muted-foreground">
              Counterfactual analysis: What would poverty look like without social programs?
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ComparisonBar
              title="Poverty Rate: With vs Without Safety Net"
              beforeLabel="Without social programs"
              beforeValue={poverty.social_programs_counterfactuals.poverty_rate_without_programs_percentage}
              afterLabel="Current (with programs)"
              afterValue={poverty.official_key_statistics.poverty_rate_percentage}
              sourceIds={poverty.social_programs_counterfactuals.source_ids}
            />
            <ComparisonBar
              title="Extreme Poverty: With vs Without Safety Net"
              beforeLabel="Without social programs"
              beforeValue={poverty.social_programs_counterfactuals.extreme_poverty_rate_without_programs_percentage}
              afterLabel="Current (with programs)"
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
            <h2 className="section-header">D. Regional Inequality</h2>
            <p className="text-muted-foreground">
              Poverty varies dramatically across Brazil's five major regions.
            </p>
          </motion.div>

          <RegionalChart data={poverty.regional_distribution} title="Poverty Rate by Region" />
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
            <h2 className="section-header">E. Racial Inequality</h2>
            <p className="text-muted-foreground">
              Poverty rates differ significantly across racial groups in Brazil.
            </p>
          </motion.div>

          <RacialChart data={poverty.racial_distribution} title="Poverty Rates by Racial Group" />
        </div>
      </section>
    </Layout>
  );
}
