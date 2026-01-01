import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { RegionalChart } from '@/components/charts/RegionalChart';
import { NarrativeSection } from '../NarrativeSection';
import { FragmentedGround } from '@/components/illustrations';

export function RegionalSection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  // Map region names to translation keys
  const regionKeyMap: Record<string, string> = {
    'Northeast': 'charts.regions.northeast',
    'North': 'charts.regions.north',
    'Central-West': 'charts.regions.centralWest',
    'Southeast': 'charts.regions.southeast',
    'South': 'charts.regions.south',
  };

  if (!data) return null;

  const { poverty } = data;

  return (
    <NarrativeSection id="regional" ariaLabel="Regional Inequality" className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 to-transparent dark:from-amber-950/10">
      <div className="container-wide">
        <FragmentedGround />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
          className="mb-8"
        >
          <h2 className="section-header">{t('poverty.regionalDistribution.title')}</h2>
          <p className="text-muted-foreground max-w-2xl">
            {t('poverty.regionalDistribution.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <RegionalChart data={poverty.regional_distribution} title={t('poverty.regionalDistribution.chartTitle')} />

          {/* Regional Table */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            viewport={{ }}
          >
            <h3 className="font-semibold mb-4">{t('poverty.regionalDistribution.detailsTitle')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t('poverty.regionalDistribution.region')}</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">{t('poverty.regionalDistribution.povertyRate')}</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">{t('poverty.regionalDistribution.population')}</th>
                  </tr>
                </thead>
                <tbody>
                  {poverty.regional_distribution
                    .sort((a, b) => b.poverty_rate_percentage - a.poverty_rate_percentage)
                    .map((region) => (
                      <tr key={region.region} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{t(regionKeyMap[region.region] || region.region)}</td>
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
          </motion.div>
        </div>
      </div>
    </NarrativeSection>
  );
}
