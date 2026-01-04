import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { KPICard } from '@/components/ui/KPICard';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertCircle, Briefcase, Users, DollarSign, TrendingUp } from 'lucide-react';
import { NarrativeSection } from '../NarrativeSection';
import { WorkforceGears } from '@/components/illustrations';

export function LaborSection() {
  const { t, i18n } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (!data) return null;

  const { labor_market, minimum_wage } = data;

  return (
    <NarrativeSection id="labor" ariaLabel="Labor Market" className="py-16 md:py-24 bg-gradient-to-b from-slate-50/30 to-transparent dark:from-slate-950/10">
      <div className="container-wide">
        <WorkforceGears />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <h2 className="text-display mb-4">{t('labor.title')}</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mb-8">
            {t('labor.description')}
          </p>
        </motion.div>

        {/* Key Insight Banner */}
        <motion.div 
          className="glass-card p-6 border-l-4 border-accent mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{t('labor.keyInsight.title')}</h3>
              <p className="text-muted-foreground">
                {t('labor.keyInsight.description', {
                  percent: labor_market.working_poor_percentage_of_employed,
                  informality: labor_market.informality_rate_percentage
                })}
              </p>
            </div>
            <SourceDrawer sourceIds={labor_market.source_ids} title={t('labor.dataTitle')} />
          </div>
        </motion.div>

        {/* Main KPIs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <KPICard
            value={labor_market.employed_population_millions}
            label={t('labor.employmentOverview.employedPopulation')}
            suffix={` ${t('labor.employmentOverview.million')}`}
            decimals={1}
            sourceIds={labor_market.source_ids}
            definition={t('labor.employmentOverview.employedPopulationDesc')}
            variant="insight"
          />
          <KPICard
            value={labor_market.informality_rate_percentage}
            label={t('labor.laborChallenges.informalityRate')}
            suffix="%"
            decimals={1}
            sourceIds={labor_market.source_ids}
            definition={t('labor.laborChallenges.informalityRateDesc')}
            variant="deficit"
          />
          <KPICard
            value={labor_market.working_poor_percentage_of_employed}
            label={t('labor.laborChallenges.workingPoor')}
            suffix="%"
            decimals={1}
            sourceIds={labor_market.source_ids}
            definition={t('labor.laborChallenges.workingPoorDesc')}
            variant="deficit"
          />
        </div>

        {/* Minimum Wage */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <div className="glass-card p-6">
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-semibold text-lg">{t('labor.minimumWage.title')}</h3>
              <SourceDrawer sourceIds={minimum_wage.source_ids} title={t('labor.minimumWage.title')} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">2025</p>
                <p className="text-2xl font-bold">R$ {minimum_wage.wage_2025_brl.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">2026</p>
                <p className="text-2xl font-bold text-secondary">R$ {minimum_wage.wage_2026_brl.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span>
                {t('labor.minimumWage.increase')} R$ {(minimum_wage.wage_2026_brl - minimum_wage.wage_2025_brl).toLocaleString()}
                ({(((minimum_wage.wage_2026_brl - minimum_wage.wage_2025_brl) / minimum_wage.wage_2025_brl) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-6">{t('labor.minimumWage.populationImpact')}</h3>
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <p className="text-4xl font-bold text-accent mb-2">
                {minimum_wage.population_affected_millions.toFixed(1)}M
              </p>
              <p className="text-muted-foreground">
                {t('labor.minimumWage.braziliansAffected')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </NarrativeSection>
  );
}
