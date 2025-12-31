import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RacialPoverty } from '@/schema';
import { SourceDrawer } from '@/components/ui/SourceDrawer';

interface RacialChartProps {
  data: RacialPoverty[];
  title: string;
}

export function RacialChart({ data, title }: RacialChartProps) {
  const allSourceIds = [...new Set(data.flatMap(d => d.source_ids))];

  const chartData = data.map(item => ({
    name: item.group.split(' ')[0], // Use short name for chart
    fullName: item.group,
    poverty: item.poverty_rate_percentage,
    extreme: item.extreme_poverty_rate_percentage,
  }));

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <SourceDrawer
          sourceIds={allSourceIds}
          title={title}
          definition="Racial distribution of poverty uses Brazilian census racial categories (cor ou raça). Categories include White (Branco), Black (Preto), Mixed (Pardo), and Indigenous groups."
        />
      </div>

      <div className="h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: 'hsl(220, 38%, 20%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(220, 13%, 88%)' }}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: 'hsl(220, 20%, 45%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(220, 13%, 88%)' }}
              domain={[0, 50]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold">{data.fullName}</p>
                      <p className="text-sm mt-2">
                        <span className="inline-block w-3 h-3 rounded mr-2" style={{ backgroundColor: 'hsl(355, 80%, 56%)' }} />
                        Poverty: <span className="font-medium">{data.poverty.toFixed(1)}%</span>
                      </p>
                      <p className="text-sm">
                        <span className="inline-block w-3 h-3 rounded mr-2" style={{ backgroundColor: 'hsl(355, 80%, 75%)' }} />
                        Extreme: <span className="font-medium">{data.extreme.toFixed(1)}%</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">
                  {value === 'poverty' ? 'Poverty Rate' : 'Extreme Poverty Rate'}
                </span>
              )}
            />
            <Bar
              dataKey="poverty"
              name="poverty"
              fill="hsl(355, 80%, 56%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="extreme"
              name="extreme"
              fill="hsl(355, 80%, 75%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
