import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle, AlertCircle, Briefcase, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function Labor() {
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
            <h1 className="text-display mb-4">Labor Market</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              Employment, informality, and the relationship between work and poverty in Brazil.
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
                <h3 className="font-semibold mb-2">Key Insight: Work Doesn't Guarantee Escape from Poverty</h3>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-destructive">{labor_market.working_poor_percentage_of_employed}%</span> of employed 
                  Brazilians still live below the poverty line. High informality ({labor_market.informality_rate_percentage}%) 
                  means millions work without labor protections or stable income.
                </p>
              </div>
              <SourceDrawer sourceIds={labor_market.source_ids} title="Labor Market Data" />
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
            <h2 className="section-header">Employment Overview</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              value={labor_market.employed_population_millions}
              label="Employed Population"
              suffix=" million"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition="Total number of employed individuals in Brazil"
              variant="insight"
            />
            <KPICard
              value={labor_market.employment_rate_percentage}
              label="Employment Rate"
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition="Percentage of working-age population that is employed"
              variant="insight"
            />
            <KPICard
              value={labor_market.unemployment_rate_percentage}
              label="Unemployment Rate"
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition="Percentage of labor force that is unemployed"
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
            <h2 className="section-header">Labor Market Challenges</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard
              value={labor_market.informality_rate_percentage}
              label="Informality Rate"
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition="Percentage of workers in informal employment without legal protections"
              variant="deficit"
            />
            <KPICard
              value={labor_market.working_poor_percentage_of_employed}
              label="Working Poor"
              suffix="%"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition="Employed individuals still living below the poverty line"
              variant="deficit"
            />
            <KPICard
              value={labor_market.income_mass_monthly_brl_billions}
              label="Monthly Income Mass"
              prefix="R$ "
              suffix="B"
              decimals={1}
              sourceIds={labor_market.source_ids}
              definition="Total monthly labor income in Brazil (billions of BRL)"
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
            <h2 className="section-header">Minimum Wage</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">Minimum Wage Evolution</h3>
                <SourceDrawer sourceIds={minimum_wage.source_ids} title="Minimum Wage" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">2024</p>
                  <p className="text-2xl font-bold">R$ {minimum_wage.wage_2024_brl.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">2025</p>
                  <p className="text-2xl font-bold text-secondary">R$ {minimum_wage.wage_2025_brl.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span>
                  Increase: R$ {(minimum_wage.wage_2025_brl - minimum_wage.wage_2024_brl).toLocaleString()} 
                  ({(((minimum_wage.wage_2025_brl - minimum_wage.wage_2024_brl) / minimum_wage.wage_2024_brl) * 100).toFixed(1)}%)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Effective date: {new Date(minimum_wage.effective_date_2025).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-semibold text-lg">Population Impact</h3>
                <SourceDrawer sourceIds={minimum_wage.source_ids} title="Minimum Wage Impact" />
              </div>
              
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-4">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <p className="text-4xl font-bold text-accent mb-2">
                  {minimum_wage.population_affected_millions.toFixed(1)}M
                </p>
                <p className="text-muted-foreground">
                  Brazilians affected by minimum wage changes
                </p>
              </div>
              
              <div className="border-t border-border pt-4 mt-4">
                <p className="text-sm text-muted-foreground text-center">
                  Includes workers earning minimum wage and those with benefits indexed to it
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
            <h3 className="font-semibold text-lg mb-6 text-center">Labor Market at a Glance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Briefcase className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">{labor_market.employed_population_millions}M</p>
                <p className="text-sm text-muted-foreground">Employed</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">{labor_market.unemployment_rate_percentage}%</p>
                <p className="text-sm text-muted-foreground">Unemployed</p>
              </div>
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <p className="text-2xl font-bold">{labor_market.informality_rate_percentage}%</p>
                <p className="text-sm text-muted-foreground">Informal</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">R${minimum_wage.wage_2025_brl}</p>
                <p className="text-sm text-muted-foreground">Min Wage 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
