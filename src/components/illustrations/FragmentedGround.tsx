import { motion, useReducedMotion } from 'framer-motion';

export function FragmentedGround() {
  const shouldReduceMotion = useReducedMotion();

  // Regional poverty data (accurate to dataset.json)
  // Heights are proportional to poverty rates for accurate visualization
  const getMaxHeight = () => 110;
  const getMinHeight = () => 30;

  const calculateHeight = (rate: number) => {
    const maxHeight = getMaxHeight();
    const minHeight = getMinHeight();
    const maxRate = 43.6; // Northeast
    const minRate = 12.1; // South
    return minHeight + ((rate - minRate) / (maxRate - minRate)) * (maxHeight - minHeight);
  };

  const calculateTopY = (rate: number) => {
    return 120 - calculateHeight(rate);
  };

  // Color scheme matches RegionalChart.tsx
  const COLORS = {
    high: 'hsl(355, 80%, 56%)',    // deficit/red
    medium: 'hsl(43, 100%, 50%)',  // amber/neutral
    low: 'hsl(187, 100%, 45%)',    // cyan/insight
  };

  const getColor = (rate: number) => {
    if (rate >= 35) return COLORS.high;
    if (rate >= 20) return COLORS.medium;
    return COLORS.low;
  };

  // Five regions at different poverty levels (heights represent inequality)
  const regions = [
    {
      x: 8,
      topY: calculateTopY(43.6),
      height: calculateHeight(43.6),
      label: 'NE',
      delay: 0,
      color: getColor(43.6),
      fillOpacity: '0.15',
      povertyRate: 43.6,
      population: 57.1
    },  // Northeast - HIGHEST poverty (43.6%)
    {
      x: 48,
      topY: calculateTopY(38.9),
      height: calculateHeight(38.9),
      label: 'N',
      delay: 0.1,
      color: getColor(38.9),
      fillOpacity: '0.15',
      povertyRate: 38.9,
      population: 18.4
    },  // North - HIGH poverty (38.9%)
    {
      x: 88,
      topY: calculateTopY(18.2),
      height: calculateHeight(18.2),
      label: 'CO',
      delay: 0.2,
      color: getColor(18.2),
      fillOpacity: '0.15',
      povertyRate: 18.2,
      population: 16.3
    },  // Central-West - MEDIUM poverty (18.2%)
    {
      x: 128,
      topY: calculateTopY(17.8),
      height: calculateHeight(17.8),
      label: 'SE',
      delay: 0.3,
      color: getColor(17.8),
      fillOpacity: '0.15',
      povertyRate: 17.8,
      population: 89.0
    },  // Southeast - LOW poverty (17.8%)
    {
      x: 168,
      topY: calculateTopY(12.1),
      height: calculateHeight(12.1),
      label: 'S',
      delay: 0.4,
      color: getColor(12.1),
      fillOpacity: '0.15',
      povertyRate: 12.1,
      population: 30.4
    }   // South - LOWEST poverty (12.1%)
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Bar chart showing poverty rates by Brazilian region: Northeast (43.6%), North (38.9%), Central-West (18.2%), Southeast (17.8%), South (12.1%)"
      >
        {/* Regional platforms at different heights */}
        {regions.map((region) => (
          <g key={`region-${region.x}`}>
            {/* Platform/column */}
            <motion.g
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : region.delay,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Top surface (3D effect) */}
              <motion.path
                d={`M ${region.x} ${region.topY}
                    L ${region.x + 30} ${region.topY - 3}
                    L ${region.x + 32} ${region.topY - 1}
                    L ${region.x + 2} ${region.topY + 2} Z`}
                fill={region.color}
                fillOpacity="0.4"
                stroke={region.color}
                strokeWidth="1"
              />

              {/* Main column */}
              <motion.rect
                x={region.x}
                y={region.topY}
                width="30"
                height={region.height}
                rx="1"
                fill={region.color}
                fillOpacity={region.fillOpacity}
                stroke={region.color}
                strokeWidth="2.5"
              />

              {/* Texture lines for ground effect */}
              {[0.3, 0.6].map((ratio, i) => (
                <motion.line
                  key={`texture-${region.x}-${i}`}
                  x1={region.x + 4}
                  y1={region.topY + region.height * ratio}
                  x2={region.x + 26}
                  y2={region.topY + region.height * ratio}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-muted-foreground/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-100px" }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.3,
                    delay: shouldReduceMotion ? 0 : region.delay + 0.4
                  }}
                />
              ))}

              {/* Region label */}
              <motion.text
                x={region.x + 15}
                y={region.topY + 15}
                textAnchor="middle"
                className="text-[10px] font-bold fill-foreground/60"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  delay: shouldReduceMotion ? 0 : region.delay + 0.5,
                  ease: "backOut"
                }}
              >
                {region.label}
              </motion.text>
            </motion.g>
          </g>
        ))}

        {/* Cracks/gaps between regions */}
        {[43, 83, 123, 163].map((x, i) => (
          <motion.line
            key={`gap-${x}`}
            x1={x}
            y1={regions[i].topY + 5}
            x2={x}
            y2={120}
            stroke="currentColor"
            strokeWidth="2"
            className="text-background"
            strokeDasharray="3,3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.8 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.8 + i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Base ground line */}
        <motion.line
          x1="0"
          y1="120"
          x2="200"
          y2="120"
          stroke="currentColor"
          strokeWidth="3"
          className="text-muted-foreground/50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          style={{ transformOrigin: '100px 120px' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            delay: shouldReduceMotion ? 0 : 1.2
          }}
        />
      </svg>
    </div>
  );
}
