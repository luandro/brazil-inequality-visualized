import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface WealthConcentrationPieProps {
  millionaireCount: number;
  totalPopulation: number;
  wealthShare: number;
}

interface PieData {
  name: string;
  value: number;
  population: number;
  count: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: PieData;
  }>;
}

interface LegendPayloadEntry {
  color: string;
  value: string;
}

interface CustomLegendProps {
  payload?: Array<LegendPayloadEntry>;
}

export function WealthConcentrationPie({
  millionaireCount,
  totalPopulation,
  wealthShare,
}: WealthConcentrationPieProps) {
  const { t } = useTranslation();

  const pieData = useMemo<PieData[]>(() => {
    const populationPercentage = (millionaireCount / totalPopulation) * 100;

    return [
      {
        name: t('home.wealthConcentration.ultraWealthy'),
        value: wealthShare,
        population: populationPercentage,
        count: millionaireCount,
      },
      {
        name: t('home.wealthConcentration.everyone'),
        value: 100 - wealthShare,
        population: 100 - populationPercentage,
        count: totalPopulation - millionaireCount,
      },
    ];
  }, [millionaireCount, totalPopulation, wealthShare, t]);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-4">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {t('home.wealthConcentration.tooltipWealth', { percent: data.value.toFixed(1) })}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.count.toLocaleString()} people
          </p>
        </div>
      );
    }
    return null;
  };

  const populationLabel = useMemo(() => {
    const percentage = (millionaireCount / totalPopulation) * 100;
    return percentage.toFixed(1);
  }, [millionaireCount, totalPopulation]);

  const CustomLegend = ({ payload }: CustomLegendProps) => {
    return (
      <div className="flex justify-center gap-6 mt-4 flex-wrap">
        {payload?.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-foreground">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div role="img" aria-label={`Wealth concentration chart showing ${populationLabel}% of population holds ${wealthShare}% of wealth`}>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => (
              <text
                fill="hsl(var(--background))"
                fontSize="14"
                fontWeight="600"
              >
                {entry.value.toFixed(1)}%
              </text>
            )}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
