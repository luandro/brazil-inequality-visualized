import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { Archive, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Deprecated() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useData();
  if (isLoading) return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div></Layout>;
  if (error || !data) return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="glass-card p-8"><AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" /><p>{error}</p></div></div></Layout>;

  return (
    <Layout>
      <section className="py-12 md:py-20"><div className="container-wide">
        <h1 className="text-display mb-4 flex items-center gap-3"><Archive className="w-10 h-10" /> {t('deprecated.title')}</h1>
        <p className="text-body-lg text-muted-foreground max-w-3xl">{t('deprecated.rationale')}</p>
      </div></section>
      <section className="py-8"><div className="container-wide">
        <div className="space-y-4">
          {data.removed_or_deprecated.removed_fields.map((field) => (
            <div key={field.field_name} className="glass-card p-5">
              <h3 className="font-semibold font-mono text-destructive">
                {t(`deprecated.fields.${field.field_name}.name` as const, { defaultValue: field.field_name })}
              </h3>
              <p className="text-muted-foreground mt-2">
                {t(`deprecated.fields.${field.field_name}.reason` as const, { defaultValue: field.reason_removed })}
              </p>
            </div>
          ))}
        </div>
      </div></section>
    </Layout>
  );
}
