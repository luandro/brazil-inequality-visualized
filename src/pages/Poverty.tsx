import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { RegionalChart } from '@/components/charts/RegionalChart';
import { RacialChart } from '@/components/charts/RacialChart';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle, Info } from 'lucide-react';

export default function Poverty() {
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
            <h1 className="text-display mb-4">Poverty Analysis</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              Deep dive into Brazil's poverty statistics, including measurement methodology,
              regional disparities, and racial distribution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Measurement Basis */}
      <section className="py-8">
        <div className="container-wide">
          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Measurement Basis</h3>
                <p className="text-muted-foreground">{poverty.measurement_basis}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">Official Key Statistics</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <KPICard
              value={poverty.official_key_statistics.poverty_rate_percentage}
              label="Poverty Rate"
              suffix="%"
              sourceIds={poverty.official_key_statistics.source_ids}
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.poverty_population_millions}
              label="In Poverty (millions)"
              suffix="M"
              sourceIds={poverty.official_key_statistics.source_ids}
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.extreme_poverty_rate_percentage}
              label="Extreme Poverty"
              suffix="%"
              sourceIds={poverty.official_key_statistics.source_ids}
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.extreme_poverty_population_millions}
              label="Extreme Poor (millions)"
              suffix="M"
              sourceIds={poverty.official_key_statistics.source_ids}
              variant="deficit"
            />
            <KPICard
              value={poverty.official_key_statistics.gini_coefficient}
              label="Gini Coefficient"
              decimals={3}
              sourceIds={poverty.official_key_statistics.source_ids}
              variant="neutral"
            />
          </div>
        </div>
      </section>

      {/* Poverty Lines */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">Poverty Lines (PPP)</h2>
            <p className="text-muted-foreground">
              International poverty thresholds adjusted for Purchasing Power Parity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg text-destructive mb-4">Extreme Poverty</h3>
                <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title="Poverty Lines" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-destructive/5 rounded-lg">
                  <span className="text-muted-foreground">Daily (USD PPP)</span>
                  <span className="text-xl font-bold text-destructive">
                    ${poverty.poverty_lines.extreme_poverty_daily_usd_ppp.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-destructive/5 rounded-lg">
                  <span className="text-muted-foreground">Monthly (BRL)</span>
                  <span className="text-xl font-bold text-destructive">
                    R${poverty.poverty_lines.extreme_poverty_monthly_brl}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg text-accent mb-4">Poverty</h3>
                <SourceDrawer sourceIds={poverty.poverty_lines.source_ids} title="Poverty Lines" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-accent/5 rounded-lg">
                  <span className="text-muted-foreground">Daily (USD PPP)</span>
                  <span className="text-xl font-bold text-accent">
                    ${poverty.poverty_lines.poverty_daily_usd_ppp.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-accent/5 rounded-lg">
                  <span className="text-muted-foreground">Monthly (BRL)</span>
                  <span className="text-xl font-bold text-accent">
                    R${poverty.poverty_lines.poverty_monthly_brl}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Distribution */}
      <section className="py-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">Regional Distribution</h2>
            <p className="text-muted-foreground">
              Poverty rates vary significantly across Brazil's five major regions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <RegionalChart data={poverty.regional_distribution} title="Poverty Rate by Region" />

            {/* Regional Table */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Regional Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Region</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Poverty Rate</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Population</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poverty.regional_distribution
                      .sort((a, b) => b.poverty_rate_percentage - a.poverty_rate_percentage)
                      .map((region) => (
                        <tr key={region.region} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 font-medium">{region.region}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={region.poverty_rate_percentage > 30 ? 'text-destructive' : 'text-foreground'}>
                              {region.poverty_rate_percentage.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-muted-foreground">
                            {region.population_millions.toFixed(1)}M
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Racial Distribution */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-header">Racial Distribution</h2>
            <p className="text-muted-foreground">
              Poverty and extreme poverty rates across racial groups in Brazil.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <RacialChart data={poverty.racial_distribution} title="Poverty by Racial Group" />

            {/* Racial Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {poverty.racial_distribution.map((group) => (
                <div key={group.group} className="glass-card p-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{group.group}</h4>
                    <SourceDrawer sourceIds={group.source_ids} title={group.group} />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Poverty</span>
                      <span className="font-semibold text-destructive">{group.poverty_rate_percentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Extreme</span>
                      <span className="font-semibold text-destructive/70">{group.extreme_poverty_rate_percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
