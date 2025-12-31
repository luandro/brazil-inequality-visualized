import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle, Info, TrendingUp, Users, Coins } from 'lucide-react';

export default function Wealth() {
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
            <h1 className="text-display mb-4">Wealth Concentration</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              Analysis of wealth distribution in Brazil, including millionaire and billionaire populations.
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
                <h3 className="font-semibold mb-2">Measurement Notes</h3>
                <p className="text-muted-foreground">{wealth.measurement_notes}</p>
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
            <h2 className="section-header">Wealth Inequality</h2>
          </motion.div>

          <div className="glass-card p-8 max-w-md">
            <div className="text-center">
              <p className="text-6xl font-bold text-destructive mb-2">{wealth.wealth_gini_coefficient.toFixed(2)}</p>
              <p className="text-lg font-medium mb-4">Wealth Gini Coefficient</p>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary via-accent to-destructive" 
                  style={{ width: `${wealth.wealth_gini_coefficient * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0 (Equal)</span>
                <span>1 (Unequal)</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Wealth inequality is significantly higher than income inequality (Gini: 0.518)
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
            <h2 className="section-header">Millionaire Population</h2>
            <p className="text-muted-foreground">
              Individuals with net worth exceeding ${wealth.millionaire_population.threshold_usd.toLocaleString()} USD.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              value={wealth.millionaire_population.count_individuals / 1000}
              label="Total Millionaires"
              suffix="K"
              decimals={0}
              sourceIds={wealth.millionaire_population.source_ids}
              definition={`Individuals with net worth over $${(wealth.millionaire_population.threshold_usd / 1000000).toFixed(0)} million USD`}
              variant="neutral"
            />
            <KPICard
              value={wealth.millionaire_population.percentage_of_population}
              label="Share of Population"
              suffix="%"
              decimals={1}
              sourceIds={wealth.millionaire_population.source_ids}
              definition="Millionaires as percentage of total Brazilian population"
              variant="neutral"
            />
            <KPICard
              value={wealth.millionaire_population.estimated_wealth_share_percentage}
              label="Wealth Share"
              suffix="%"
              decimals={1}
              sourceIds={wealth.millionaire_population.source_ids}
              definition="Share of total national wealth held by millionaires"
              variant="deficit"
            />
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-medium">Concentration Ratio</h4>
                <SourceDrawer sourceIds={wealth.millionaire_population.source_ids} title="Wealth Concentration" />
              </div>
              <p className="text-3xl font-bold text-destructive">
                {(wealth.millionaire_population.estimated_wealth_share_percentage / wealth.millionaire_population.percentage_of_population).toFixed(0)}x
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {wealth.millionaire_population.percentage_of_population}% of the population holds {wealth.millionaire_population.estimated_wealth_share_percentage}% of wealth
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
            <h2 className="section-header">Billionaire Population</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">Billionaire Count Trend</h3>
                <SourceDrawer sourceIds={wealth.billionaire_population.source_ids} title="Billionaire Data" />
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
                  <span className="font-semibold text-secondary">
                    +{((wealth.billionaire_population.count_2025 - wealth.billionaire_population.count_2024) / wealth.billionaire_population.count_2024 * 100).toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground ml-2">year-over-year increase</span>
                </span>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">Additional Notes</h3>
                <SourceDrawer sourceIds={wealth.billionaire_population.source_ids} title="Billionaire Notes" />
              </div>
              
              <p className="text-muted-foreground mb-6">{wealth.billionaire_population.notes}</p>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Context</h4>
                <p className="text-sm text-muted-foreground">
                  Brazil ranks among the top 10 countries by billionaire count globally. 
                  The combined wealth of Brazilian billionaires exceeds the annual income 
                  of the poorest 50% of the population.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="py-12 bg-muted/30">
        <div className="container-wide">
          <div className="glass-card p-8 text-center">
            <h3 className="font-semibold text-lg mb-8">The Wealth Gap Visualized</h3>
            
            <div className="flex items-end justify-center gap-8 h-48 mb-6">
              <div className="text-center">
                <div 
                  className="w-16 bg-gradient-to-t from-destructive to-red-400 rounded-t-lg mx-auto mb-2"
                  style={{ height: `${wealth.millionaire_population.estimated_wealth_share_percentage * 3}px` }}
                />
                <p className="font-bold">{wealth.millionaire_population.estimated_wealth_share_percentage}%</p>
                <p className="text-xs text-muted-foreground">Wealth held by</p>
                <p className="text-xs text-muted-foreground">millionaires</p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 bg-gradient-to-t from-secondary to-cyan-400 rounded-t-lg mx-auto mb-2"
                  style={{ height: `${(100 - wealth.millionaire_population.estimated_wealth_share_percentage) * 3}px` }}
                />
                <p className="font-bold">{(100 - wealth.millionaire_population.estimated_wealth_share_percentage).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Wealth held by</p>
                <p className="text-xs text-muted-foreground">everyone else</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Just {wealth.millionaire_population.percentage_of_population}% of Brazilians (millionaires) 
              control nearly half of all wealth, while 99.8% of the population shares the remaining half.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
