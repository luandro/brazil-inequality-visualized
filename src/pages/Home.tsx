import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Calculator, TrendingDown, Users, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { ComparisonBar } from '@/components/charts/ComparisonBar';
import { Layout } from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{t('common.loading')}</p>
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
            <h1 className="text-2xl font-bold mb-2">{t('common.dataValidationError')}</h1>
            <p className="text-muted-foreground mb-4">
              {t('common.dataValidationErrorDesc')}
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
            className="w-full sm:max-w-4xl"
          >
            <h1 className="text-hero mb-6 overflow-hidden">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <span className="text-foreground tracking-tight whitespace-nowrap">{t('home.hero.truth')}</span>
                <span className="text-secondary whitespace-nowrap">→</span>
                <span className="text-foreground tracking-tight whitespace-nowrap">{t('home.hero.choices')}</span>
                <span className="text-secondary whitespace-nowrap">→</span>
                <span className="text-foreground tracking-tight whitespace-nowrap">{t('home.hero.consequences')}</span>
              </div>
            </h1>

            <p className="text-body-lg text-muted-foreground max-w-2xl mb-10">
              {t('home.hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/truth">
                  <BarChart3 className="w-5 h-5" />
                  {t('home.hero.exploreReality')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/simulator">
                  <Calculator className="w-5 h-5" />
                  {t('home.hero.runSimulations')}
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
            <h2 className="section-header">{t('home.keyStats.title')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('home.keyStats.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <KPICard
              value={poverty.official_key_statistics.poverty_rate_percentage}
              label={t('home.keyStats.livingInPoverty')}
              suffix="%"
              decimals={1}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition={t('home.keyStats.povertyTooltip')}
              variant="deficit"
              size="lg"
            />
            <KPICard
              value={poverty.official_key_statistics.extreme_poverty_rate_percentage}
              label={t('home.keyStats.inExtremePoverty')}
              suffix="%"
              decimals={1}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition={t('home.keyStats.extremePovertyTooltip')}
              variant="deficit"
              size="lg"
            />
            <KPICard
              value={poverty.official_key_statistics.gini_coefficient}
              label={t('home.keyStats.incomeGini')}
              decimals={3}
              sourceIds={poverty.official_key_statistics.source_ids}
              definition={t('home.keyStats.giniTooltip')}
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
            <h2 className="section-header">{t('home.socialPrograms.title')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('home.socialPrograms.description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ComparisonBar
              title={t('home.socialPrograms.povertyRateComparison')}
              beforeLabel={t('home.socialPrograms.withoutPrograms')}
              beforeValue={poverty.social_programs_counterfactuals.poverty_rate_without_programs_percentage}
              afterLabel={t('home.socialPrograms.withPrograms')}
              afterValue={poverty.official_key_statistics.poverty_rate_percentage}
              sourceIds={poverty.social_programs_counterfactuals.source_ids}
            />
            <ComparisonBar
              title={t('home.socialPrograms.extremePovertyComparison')}
              beforeLabel={t('home.socialPrograms.withoutPrograms')}
              beforeValue={poverty.social_programs_counterfactuals.extreme_poverty_rate_without_programs_percentage}
              afterLabel={t('home.socialPrograms.withPrograms')}
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
            <h2 className="section-header">{t('home.exploreData.title')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('home.exploreData.description')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                to: '/poverty',
                icon: Users,
                titleKey: 'home.exploreData.poverty',
                descKey: 'home.exploreData.povertyDesc',
                stat: `${poverty.official_key_statistics.poverty_population_millions.toFixed(1)}M people`,
              },
              {
                to: '/labor',
                icon: Users,
                titleKey: 'home.exploreData.labor',
                descKey: 'home.exploreData.laborDesc',
                stat: `${labor_market.informality_rate_percentage.toFixed(1)}% informal`,
              },
              {
                to: '/wealth',
                icon: Coins,
                titleKey: 'home.exploreData.wealth',
                descKey: 'home.exploreData.wealthDesc',
                stat: `${wealth.millionaire_population.count_individuals.toLocaleString()} millionaires`,
              },
              {
                to: '/simulator',
                icon: Calculator,
                titleKey: 'home.exploreData.simulator',
                descKey: 'home.exploreData.simulatorDesc',
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
                  <h3 className="font-semibold text-lg mb-1">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t(item.descKey)}</p>
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
            <h3 className="text-xl font-semibold mb-2">{t('home.verifiedData.title')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('home.verifiedData.description')}
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
