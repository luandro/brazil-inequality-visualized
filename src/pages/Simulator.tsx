import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { AlertTriangle, Info, Calculator, Sliders } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export default function Simulator() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useData();
  const prefersReducedMotion = useReducedMotion();

  const [taxBase, setTaxBase] = useState<'millionaires' | 'billionaires'>('millionaires');
  const [taxRate, setTaxRate] = useState(2);
  const [compliance, setCompliance] = useState(70);
  const [adminCost, setAdminCost] = useState(10);
  const [horizon, setHorizon] = useState(5);
  const [povertyAlloc, setPovertyAlloc] = useState(60);
  const [servicesAlloc, setServicesAlloc] = useState(25);

  if (isLoading || !data) {
    return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div></Layout>;
  }

  if (error) {
    return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="glass-card p-8"><AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" /><p>{error}</p></div></div></Layout>;
  }

  const { poverty, wealth } = data;
  const regionalAlloc = 100 - povertyAlloc - servicesAlloc;

  // Simulation calculations (clearly marked as assumptions)
  const taxableWealth = taxBase === 'millionaires' 
    ? wealth.millionaire_population.count_individuals * 2500000 // Assumed avg wealth
    : wealth.billionaire_population.count_2025 * 2500000000;
  const annualRevenue = (taxableWealth * (taxRate / 100) * (compliance / 100) * (1 - adminCost / 100)) / 1e9;
  const totalRevenue = annualRevenue * horizon;
  const povertyGap = poverty.official_key_statistics.poverty_population_millions * poverty.poverty_lines.poverty_monthly_brl * 12 / 1e9;
  const gapCovered = Math.min(100, (totalRevenue * (povertyAlloc / 100)) / povertyGap * 100);
  const peopleLiftedEstimate = (gapCovered / 100) * poverty.official_key_statistics.poverty_population_millions;

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
            <h1 className="text-display mb-4">{t('simulator.title')}</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl" dangerouslySetInnerHTML={{ __html: t('simulator.description') }}></p>
          </motion.div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="pb-8"><div className="container-wide">
        <div className="glass-card p-4 border-l-4 border-destructive flex items-start gap-3">
          <Info className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground"><strong className="text-foreground">{t('simulator.disclaimer.title')}</strong> {t('simulator.disclaimer.text')}</p>
        </div>
      </div></section>

      {/* Baseline Anchors */}
      <section className="pb-8"><div className="container-wide">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">{t('simulator.baseline.title')}</h3><SourceDrawer sourceIds={poverty.official_key_statistics.source_ids} title={t('simulator.baseline.dataTitle')} /></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-muted-foreground">{t('simulator.baseline.povertyLine')}</span> <strong>R${poverty.poverty_lines.poverty_monthly_brl}/mo</strong></div>
            <div><span className="text-muted-foreground">{t('simulator.baseline.povertyRate')}</span> <strong>{poverty.official_key_statistics.poverty_rate_percentage}%</strong></div>
            <div><span className="text-muted-foreground">{t('simulator.baseline.inPoverty')}</span> <strong>{poverty.official_key_statistics.poverty_population_millions}M</strong></div>
            <div><span className="text-muted-foreground">{t('simulator.baseline.millionaires')}</span> <strong>{(wealth.millionaire_population.count_individuals/1000).toFixed(0)}K</strong></div>
          </div>
        </div>
      </div></section>

      {/* Two-Panel Layout */}
      <section className="py-8"><div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2"><Sliders className="w-5 h-5" /> {t('simulator.controls.title')}</h3>
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">{t('simulator.controls.taxBase')}</Label>
                <div className="flex gap-2">
                  {(['millionaires', 'billionaires'] as const).map(opt => (
                    <button key={opt} onClick={() => setTaxBase(opt)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${taxBase === opt ? 'bg-secondary text-primary' : 'bg-muted hover:bg-muted/80'}`}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div><Label>{t('simulator.controls.taxRate', { rate: taxRate })}</Label><Slider value={[taxRate]} onValueChange={([v]) => setTaxRate(v)} min={0} max={5} step={0.5} className="mt-2" /></div>
              <div><Label>{t('simulator.controls.complianceRate', { rate: compliance })}</Label><Slider value={[compliance]} onValueChange={([v]) => setCompliance(v)} min={30} max={95} step={5} className="mt-2" /></div>
              <div><Label>{t('simulator.controls.adminCost', { cost: adminCost })}</Label><Slider value={[adminCost]} onValueChange={([v]) => setAdminCost(v)} min={0} max={20} step={1} className="mt-2" /></div>
              <div><Label>{t('simulator.controls.horizon', { years: horizon })}</Label><Slider value={[horizon]} onValueChange={([v]) => setHorizon(v)} min={1} max={10} step={1} className="mt-2" /></div>
              <div className="border-t pt-4"><Label className="mb-2 block">{t('simulator.controls.allocation')}</Label>
                <div className="space-y-3">
                  <div><span className="text-sm">{t('simulator.controls.povertyGap', { percent: povertyAlloc })}</span><Slider value={[povertyAlloc]} onValueChange={([v]) => setPovertyAlloc(Math.min(v, 100 - servicesAlloc))} min={0} max={100} className="mt-1" /></div>
                  <div><span className="text-sm">{t('simulator.controls.services', { percent: servicesAlloc })}</span><Slider value={[servicesAlloc]} onValueChange={([v]) => setServicesAlloc(Math.min(v, 100 - povertyAlloc))} min={0} max={100} className="mt-1" /></div>
                  <div className="text-sm text-muted-foreground">{t('simulator.controls.regionalFund', { percent: regionalAlloc })}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2"><Calculator className="w-5 h-5" /> {t('simulator.results.title')}</h3>
            <div className="space-y-6">
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">{t('simulator.results.annualRevenue')}</p>
                <p className="text-3xl font-bold text-secondary">R$ {annualRevenue.toFixed(1)}B</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground">{t('simulator.results.totalOverYears', { years: horizon })}</p>
                <p className="text-3xl font-bold text-accent">R$ {totalRevenue.toFixed(1)}B</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{t('simulator.results.povertyGapCovered')}</p>
                <p className="text-3xl font-bold">{gapCovered.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{t('simulator.results.estPeopleLifted')}</p>
                <p className="text-3xl font-bold">{peopleLiftedEstimate.toFixed(1)}M</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg text-sm text-destructive">
                <strong>{t('simulator.results.assumptions')}</strong>
              </div>
            </div>
          </div>
        </div>
      </div></section>
    </Layout>
  );
}
