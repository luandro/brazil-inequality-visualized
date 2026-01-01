import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Archive } from 'lucide-react';
import { NarrativeSection } from '../NarrativeSection';

export function DeprecatedSection() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const deprecatedFields = [
    'gdp_per_capita_usd',
    'human_development_index',
    'middle_class_percentage'
  ];

  return (
    <NarrativeSection id="deprecated" ariaLabel="Deprecated" className="py-16 md:py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-display mb-4 flex items-center gap-3">
            <Archive className="w-10 h-10" /> {t('deprecated.title')}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mb-8">
            {t('deprecated.rationale')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {deprecatedFields.map((fieldKey, index) => (
            <motion.div
              key={fieldKey}
              className="glass-card p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold font-mono text-destructive">
                {t(`deprecated.fields.${fieldKey}.name`)}
              </h3>
              <p className="text-muted-foreground mt-2">
                {t(`deprecated.fields.${fieldKey}.reason`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </NarrativeSection>
  );
}
