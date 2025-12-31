import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Calculator, TrendingDown, Users, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { ComparisonBar } from '@/components/charts/ComparisonBar';
import { Layout } from '@/components/layout/Layout';

export default function Home() {
  const { data, isLoading, error } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dataset...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="max-w-lg text-center glass-card p-8">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Data Validation Error</h1>
            <p className="text-muted-foreground mb-4">
              The dataset failed Zod schema validation. Please check the data format.
            </p>
            <pre className="text-left text-xs bg-muted p-4 rounded-lg overflow-auto max-h-48 text-destructive">
              {error}
            </pre>
          </div>
        </div>
      </Layout>
    );
  }

  const { poverty, labor_market, wealth } = data;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container-wide relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-hero mb-6">
              <span className="text-foreground">Truth</span>
              <span className="text-secondary mx-4">→</span>
              <span className="text-foreground">Choices</span>
              <span className="text-secondary mx-4">→</span>
              <span className="text-foreground">Consequences</span>
            </h1>
            
            <p className="text-body-lg text-muted-foreground max-w-2xl mb-10">
              Understanding Brazil's inequality through validated data. Every number is sourced,
              every simulation clearly labeled. Make informed choices based on truth.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/truth">
                  <BarChart3 className="w-5 h-5" />
                  Explore Reality
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/simulator">
                  <Calculator className="w-5 h-5" />
                  Run Simulations
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="section-header">Brazil at a Glance</h2>
            <p className="text-muted-foreground max-w-2xl">
              Three numbers that define Brazil's inequality challenge. Each figure is validated
              against official sources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <KPICard
              value={poverty.official_key_statistics.poverty_rate_percentage}
              label="Living in poverty"
              suffix="%"
              decimals={1}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition="Percentage of population living below the $6.85/day poverty line (2017 PPP)"
              variant="deficit"
              size="lg"
            />
            <KPICard
              value={poverty.official_key_statistics.extreme_poverty_rate_percentage}
              label="In extreme poverty"
              suffix="%"
              decimals={1}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition="Percentage living below $2.15/day extreme poverty line (2017 PPP)"
              variant="deficit"
              size="lg"
            />
            <KPICard
              value={poverty.official_key_statistics.gini_coefficient}
              label="Income Gini coefficient"
              decimals={3}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition="Gini coefficient measures income inequality from 0 (perfect equality) to 1 (maximum inequality)"
              variant="neutral"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Social Programs Impact */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="section-header">The Impact of Social Programs</h2>
            <p className="text-muted-foreground max-w-2xl">
              What would Brazil look like without its social safety net? Compare the reality
              with and without programs like Bolsa Família.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ComparisonBar
              title="Poverty Rate Comparison"
              beforeLabel="Without social programs"
              beforeValue={poverty.social_programs_counterfactuals.poverty_rate_without_programs_percentage}
              afterLabel="With social programs (current)"
              afterValue={poverty.official_key_statistics.poverty_rate_percentage}
              sourceIds={poverty.social_programs_counterfactuals.source_ids}
            />
            <ComparisonBar
              title="Extreme Poverty Rate Comparison"
              beforeLabel="Without social programs"
              beforeValue={poverty.social_programs_counterfactuals.extreme_poverty_rate_without_programs_percentage}
              afterLabel="With social programs (current)"
              afterValue={poverty.official_key_statistics.extreme_poverty_rate_percentage}
              sourceIds={poverty.social_programs_counterfactuals.source_ids}
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="section-header">Explore the Data</h2>
            <p className="text-muted-foreground max-w-2xl">
              Dive deeper into specific aspects of Brazil's inequality landscape.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                to: '/poverty',
                icon: Users,
                title: 'Poverty',
                desc: 'Regional and racial distribution',
                stat: `${poverty.official_key_statistics.poverty_population_millions.toFixed(1)}M people`,
              },
              {
                to: '/labor',
                icon: Users,
                title: 'Labor Market',
                desc: 'Employment and informality',
                stat: `${labor_market.informality_rate_percentage.toFixed(1)}% informal`,
              },
              {
                to: '/wealth',
                icon: Coins,
                title: 'Wealth',
                desc: 'Concentration at the top',
                stat: `${wealth.millionaire_population.count_individuals.toLocaleString()} millionaires`,
              },
              {
                to: '/simulator',
                icon: Calculator,
                title: 'Simulator',
                desc: 'Model policy impacts',
                stat: 'Interactive tool',
              },
            ].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={item.to}
                  className="glass-card-hover p-6 block group h-full"
                >
                  <item.icon className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <p className="text-secondary font-medium">{item.stat}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Trust Badge */}
      <section className="py-16">
        <div className="container-wide">
          <div className="glass-card p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Data</h3>
            <p className="text-muted-foreground mb-4">
              Every statistic in this application is validated against official sources.
              Click the "Sources" button on any metric to see its origins.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="chip-insight">IBGE</span>
              <span className="chip-insight">World Bank</span>
              <span className="chip-insight">IPEA</span>
              <span className="chip-neutral">Forbes</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
