import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RegionalPoverty } from '@/schema';
import { SourceDrawer } from '@/components/ui/SourceDrawer';
import { useTranslation } from 'react-i18next';

interface RegionalChartProps {
  data: RegionalPoverty[];
  title: string;
}

const COLORS = {
  high: 'hsl(355, 80%, 56%)',    // deficit/red
  medium: 'hsl(43, 100%, 50%)',  // amber/neutral
  low: 'hsl(187, 100%, 45%)',    // cyan/insight
};

function getColor(rate: number) {
  if (rate >= 35) return COLORS.high;
  if (rate >= 20) return COLORS.medium;
  return COLORS.low;
}

export function RegionalChart({ data, title }: RegionalChartProps) {
  const { t } = useTranslation();
  const sortedData = [...data].sort((a, b) => b.poverty_rate_percentage - a.poverty_rate_percentage);
  const allSourceIds = [...new Set(data.flatMap(d => d.source_ids))];

  const chartData = sortedData.map(item => ({
    name: item.region,
    rate: item.poverty_rate_percentage,
    population: item.population_millions,
  }));

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <SourceDrawer
          sourceIds={allSourceIds}
          title={title}
          definition="Regional poverty rates show the percentage of population living below the poverty line in each major Brazilian region."
        />
      </div>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
            <XAxis
              type="number"
              domain={[0, 50]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: 'hsl(220, 20%, 45%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(220, 13%, 88%)' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: 'hsl(220, 38%, 20%)', fontSize: 13, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold">{data.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('charts.povertyRateLabel')} <span className="font-medium text-foreground">{data.rate.toFixed(1)}%</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t('charts.populationLabel')} <span className="font-medium text-foreground">{data.population.toFixed(1)}M</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.rate)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.high }} />
          <span>{t('charts.high')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.medium }} />
          <span>{t('charts.medium')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.low }} />
          <span>{t('charts.low')}</span>
        </div>
      </div>
    </div>
  );
}
