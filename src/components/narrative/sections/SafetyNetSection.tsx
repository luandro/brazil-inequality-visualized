import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { ComparisonBar } from '@/components/charts/ComparisonBar';
import { NarrativeSection } from '../NarrativeSection';
import { SafetyNet } from '@/components/illustrations';

export function SafetyNetSection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (!data) return null;

  const { poverty } = data;

  return (
    <NarrativeSection id="safety-net" ariaLabel="Safety Net Impact" className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/30 to-transparent dark:from-emerald-950/10">
      <div className="container-wide">
        <SafetyNet />

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
    </NarrativeSection>
  );
}
