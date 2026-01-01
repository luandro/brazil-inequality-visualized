import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { RacialChart } from '@/components/charts/RacialChart';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { NarrativeSection } from '../NarrativeSection';
import { UnevenDoors } from '@/components/illustrations';

export function RacialSection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  // Map racial groups to translation keys
  const racialGroupKeyMap: Record<string, string> = {
    'White (Branco)': 'charts.racialGroups.white',
    'Black (Preto)': 'charts.racialGroups.black',
    'Mixed (Pardo)': 'charts.racialGroups.mixed',
    'Indigenous': 'charts.racialGroups.indigenous',
  };

  if (!data) return null;

  const { poverty } = data;

  return (
    <NarrativeSection id="racial" ariaLabel="Racial Inequality" className="py-16 md:py-24 bg-gradient-to-b from-purple-50/30 to-transparent dark:from-purple-950/10">
      <div className="container-wide">
        <UnevenDoors />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="section-header">{t('poverty.racialDistribution.title')}</h2>
          <p className="text-muted-foreground max-w-2xl">
            {t('poverty.racialDistribution.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <RacialChart data={poverty.racial_distribution} title={t('poverty.racialDistribution.chartTitle')} />

          {/* Racial Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {poverty.racial_distribution.map((group, index) => (
              <motion.div 
                key={group.group} 
                className="glass-card p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{t(racialGroupKeyMap[group.group] || group.group)}</h4>
                  <SourceDrawer sourceIds={group.source_ids} title={t(racialGroupKeyMap[group.group] || group.group)} />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('poverty.racialDistribution.poverty')}</span>
                    <span className="font-semibold text-destructive">{group.poverty_rate_percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('poverty.racialDistribution.extreme')}</span>
                    <span className="font-semibold text-destructive/70">{group.extreme_poverty_rate_percentage}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </NarrativeSection>
  );
}
