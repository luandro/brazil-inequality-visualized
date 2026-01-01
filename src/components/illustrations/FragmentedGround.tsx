import { motion, useReducedMotion } from 'framer-motion';

export function FragmentedGround() {
  const shouldReduceMotion = useReducedMotion();

  // Five regions at different poverty levels (heights represent inequality)
  const regions = [
    { x: 8, topY: 65, height: 55, label: 'N', delay: 0, color: 'destructive' },      // North - highest poverty
    { x: 48, topY: 50, height: 70, label: 'NE', delay: 0.1, color: 'destructive' },  // Northeast - high poverty
    { x: 88, topY: 25, height: 95, label: 'CO', delay: 0.2, color: 'secondary' },    // Center-West - medium
    { x: 128, topY: 15, height: 105, label: 'S', delay: 0.3, color: 'primary' },     // South - lower poverty
    { x: 168, topY: 10, height: 110, label: 'SE', delay: 0.4, color: 'primary' }     // Southeast - lowest poverty
  ];

  const getColorClass = (color: string) => {
    if (color === 'destructive') return 'fill-destructive/10 stroke-destructive';
    if (color === 'secondary') return 'fill-secondary/10 stroke-secondary';
    return 'fill-primary/10 stroke-primary';
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Regional inequality visualization - Brazil's 5 regions at different poverty levels"
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
                className={region.color === 'destructive' ? 'fill-destructive/30' :
                          region.color === 'secondary' ? 'fill-secondary/30' : 'fill-primary/30'}
              />

              {/* Main column */}
              <motion.rect
                x={region.x}
                y={region.topY}
                width="30"
                height={region.height}
                rx="1"
                className={getColorClass(region.color)}
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
