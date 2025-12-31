import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { ExternalLink, BookOpen, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Methodology() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useData();
  if (isLoading) return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div></Layout>;
  if (error || !data) return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="glass-card p-8"><AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" /><p>{error}</p></div></div></Layout>;

  return (
    <Layout>
      <section className="py-12 md:py-20"><div className="container-wide">
        <h1 className="text-display mb-4">{t('methodology.title')}</h1>
        <p className="text-body-lg text-muted-foreground max-w-3xl mb-4">{t('methodology.description')}</p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{t('methodology.lastUpdated', { date: data.metadata.last_updated })}</span>
          <span>•</span>
          <span>{t('methodology.dataCurrencyText')}</span>
        </div>
      </div></section>

      <section className="py-8"><div className="container-wide">
        <h2 className="section-header">{t('methodology.sourceCatalog.title')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(data.source_catalog).map(([id, source]) => (
            <div key={id} className="glass-card p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{source.name}</h3>
                {source.url && <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80"><ExternalLink className="w-4 h-4" /></a>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{source.publisher} • {source.year}</p>
              {source.notes && <p className="text-sm text-muted-foreground mt-2 pt-2 border-t border-border/50">{source.notes}</p>}
              <p className="text-xs text-muted-foreground/60 mt-2 font-mono">{t('methodology.sourceCatalog.id', { id })}</p>
            </div>
          ))}
        </div>
      </div></section>

      <section className="py-8 bg-muted/30"><div className="container-wide">
        <h2 className="section-header">{t('methodology.dataQuality.title')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">{t('methodology.dataQuality.reliabilityRatings')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span>{t('methodology.dataQuality.officialData')}</span><span className="chip-insight">{data.data_quality_notes.official_data_reliability}</span></div>
              <div className="flex justify-between"><span>{t('methodology.dataQuality.wealthEstimates')}</span><span className="chip-neutral">{data.data_quality_notes.wealth_estimate_reliability}</span></div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">{t('methodology.dataQuality.knownLimitations')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {data.data_quality_notes.known_limitations.map((lim, i) => <li key={i}>• {lim}</li>)}
            </ul>
          </div>
        </div>
      </div></section>
    </Layout>
  );
}
