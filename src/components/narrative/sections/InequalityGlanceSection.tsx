import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { WealthConcentrationPie } from '@/components/charts/WealthConcentrationPie';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { NarrativeSection } from '../NarrativeSection';

export function InequalityGlanceSection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (!data) return null;

  const { poverty, wealth } = data;

  return (
    <NarrativeSection id="truth" ariaLabel="Reality Dashboard" className="py-16 md:py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-display mb-4">{t('truth.title')}</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl">
            {t('truth.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
          <KPICard
            value={wealth.millionaire_population.count_individuals}
            label={t('home.keyStats.ultraWealthy')}
            decimals={0}
            sourceIds={wealth.millionaire_population.source_ids}
            definition={t('home.keyStats.ultraWealthyTooltip')}
            variant="insight"
            size="lg"
            formatCompact={true}
          />
        </div>

        {/* Wealth Concentration Chart */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-2 text-center">
            {t('home.wealthConcentration.title')}
          </h3>
          <p className="text-muted-foreground text-center mb-8">
            {t('home.wealthConcentration.description')}
          </p>

          <WealthConcentrationPie
            millionaireCount={wealth.millionaire_population.count_individuals}
            totalPopulation={data.metadata.population_total_millions * 1000000}
            wealthShare={wealth.millionaire_population.estimated_wealth_share_percentage}
          />

          <div className="flex justify-center mt-6">
            <SourceDrawer
              sourceIds={wealth.millionaire_population.source_ids}
              title={t('home.wealthConcentration.title')}
            />
          </div>
        </motion.div>
      </div>
    </NarrativeSection>
  );
}
