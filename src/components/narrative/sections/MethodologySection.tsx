import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { ExternalLink, BookOpen } from 'lucide-react';
import { NarrativeSection } from '../NarrativeSection';

export function MethodologySection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (!data) return null;

  return (
    <NarrativeSection id="methodology" ariaLabel="Methodology" className="py-16 md:py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-display mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            {t('methodology.title')}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mb-4">
            {t('methodology.description')}
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground mb-8">
            <span>{t('methodology.lastUpdated', { date: data.metadata.last_updated })}</span>
            <span>•</span>
            <span>{t('methodology.dataCurrencyText')}</span>
          </div>
        </motion.div>

        <h3 className="section-header">{t('methodology.sourceCatalog.title')}</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {Object.entries(data.source_catalog).map(([id, source], index) => (
            <motion.div 
              key={id} 
              className="glass-card p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold">{source.name}</h4>
                {source.url && (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-secondary hover:text-secondary/80"
                    aria-label={`Visit ${source.name} website`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{source.publisher} • {source.year}</p>
              {source.notes && (
                <p className="text-sm text-muted-foreground mt-2 pt-2 border-t border-border/50">{source.notes}</p>
              )}
              <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
                {t('methodology.sourceCatalog.id', { id })}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Data Quality */}
        <h3 className="section-header">{t('methodology.dataQuality.title')}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">{t('methodology.dataQuality.reliabilityRatings')}</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>{t('methodology.dataQuality.officialData')}</span>
                <span className="chip-insight">{data.data_quality_notes.official_data_reliability}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('methodology.dataQuality.wealthEstimates')}</span>
                <span className="chip-neutral">{data.data_quality_notes.wealth_estimate_reliability}</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">{t('methodology.dataQuality.knownLimitations')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {data.data_quality_notes.known_limitations.map((lim, i) => (
                <li key={i}>• {lim}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </NarrativeSection>
  );
}
