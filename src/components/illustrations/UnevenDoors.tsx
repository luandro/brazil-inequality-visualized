import { motion, useReducedMotion } from 'framer-motion';

export function UnevenDoors() {
  const shouldReduceMotion = useReducedMotion();

  // Doors representing different opportunities (racial inequality)
  const doors = [
    { x: 12, topY: 55, height: 65, width: 35, color: 'destructive', open: 20, delay: 0 },      // Shortest - least opportunity
    { x: 56, topY: 40, height: 80, width: 35, color: 'secondary', open: 50, delay: 0.15 },     // Medium-short
    { x: 100, topY: 62, height: 58, width: 35, color: 'secondary', open: 40, delay: 0.3 },     // Medium
    { x: 144, topY: 20, height: 100, width: 35, color: 'primary', open: 80, delay: 0.45 }      // Tallest - most opportunity
  ];

  const getColorClass = (color: string) => {
    if (color === 'destructive') return { stroke: 'stroke-destructive', fill: 'fill-destructive' };
    if (color === 'secondary') return { stroke: 'stroke-secondary', fill: 'fill-secondary' };
    return { stroke: 'stroke-primary', fill: 'fill-primary' };
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Racial inequality visualization - uneven doors of opportunity"
      >
        {doors.map((door, doorIdx) => {
          const colors = getColorClass(door.color);
          return (
            <g key={`door-${door.x}`}>
              {/* Door shadow for depth */}
              <motion.rect
                x={door.x + 2}
                y={door.topY + 2}
                width={door.width}
                height={door.height}
                rx="4"
                className="fill-foreground/5"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ margin: "-100px" }}
                style={{ transformOrigin: `${door.x + door.width / 2 + 2}px ${door.topY + door.height + 2}px` }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : door.delay,
                  ease: "easeOut"
                }}
              />

              {/* Door frame/jamb */}
              <motion.rect
                x={door.x}
                y={door.topY}
                width={door.width}
                height={door.height}
                rx="4"
                className={`fill-none ${colors.stroke}`}
                strokeWidth="3"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ margin: "-100px" }}
                style={{ transformOrigin: `${door.x + door.width / 2}px ${door.topY + door.height}px` }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : door.delay,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />

              {/* Door background fill */}
              <motion.rect
                x={door.x + 2.5}
                y={door.topY + 2.5}
                width={door.width - 5}
                height={door.height - 5}
                rx="3"
                className={`${colors.fill}/10`}
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ margin: "-100px" }}
                style={{ transformOrigin: `${door.x + door.width / 2}px ${door.topY + door.height}px` }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : door.delay + 0.1,
                  ease: "easeOut"
                }}
              />

              {/* Door panels - upper and lower */}
              {[0.25, 0.65].map((ratio, panelIdx) => (
                <motion.rect
                  key={`panel-${door.x}-${panelIdx}`}
                  x={door.x + 6}
                  y={door.topY + door.height * (ratio - 0.08)}
                  width={door.width - 12}
                  height={door.height * 0.15}
                  rx="2"
                  className={`fill-none ${colors.stroke}/40`}
                  strokeWidth="1.5"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ margin: "-100px" }}
                  style={{ transformOrigin: `${door.x + door.width / 2}px ${door.topY + door.height * ratio}px` }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : door.delay + 0.3 + panelIdx * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}

              {/* Door handle */}
              <motion.ellipse
                cx={door.x + door.width * 0.78}
                cy={door.topY + door.height * 0.52}
                rx="2.5"
                ry="1.5"
                className={colors.fill}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  delay: shouldReduceMotion ? 0 : door.delay + 0.5,
                  ease: "backOut"
                }}
              />

              {/* Keyhole */}
              <motion.circle
                cx={door.x + door.width * 0.78}
                cy={door.topY + door.height * 0.58}
                r="1"
                className={`${colors.fill}/60`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.2,
                  delay: shouldReduceMotion ? 0 : door.delay + 0.6,
                  ease: "easeOut"
                }}
              />

              {/* Doorway light/glow showing openness */}
              <motion.path
                d={`M ${door.x + 3} ${door.topY + 5}
                    L ${door.x + 3} ${door.topY + door.height - 5}
                    Q ${door.x + door.width * 0.3} ${door.topY + door.height / 2},
                      ${door.x + 3} ${door.topY + 5}`}
                className={`${colors.fill}/20`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: door.open / 100 }}
                viewport={{ margin: "-100px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : door.delay + 0.4,
                  ease: "easeOut"
                }}
              />

              {/* Opportunity indicator (light beam) */}
              <motion.line
                x1={door.x + door.width / 2}
                y1={door.topY - 5}
                x2={door.x + door.width / 2}
                y2={door.topY - 12}
                stroke="currentColor"
                strokeWidth="2"
                className={`${colors.stroke}`}
                strokeLinecap="round"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: door.open / 100, scaleY: 1 }}
                viewport={{ margin: "-100px" }}
                style={{ transformOrigin: `${door.x + door.width / 2}px ${door.topY - 5}px` }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : door.delay + 0.7,
                  ease: "easeOut"
                }}
              />
            </g>
          );
        })}

        {/* Ground with slight perspective */}
        <motion.path
          d="M 0 120 Q 100 122, 200 120"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-muted-foreground/50"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            delay: shouldReduceMotion ? 0 : 0.8,
            ease: "easeInOut"
          }}
        />

        {/* Ground fill */}
        <motion.rect
          x="0"
          y="120"
          width="200"
          height="10"
          className="fill-muted/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 1
          }}
        />
      </svg>
    </div>
  );
}
