import { motion } from 'framer-motion';
import type { RacialPoverty } from '@/schema';
import { useHandDrawnAnimation } from './hooks/use-hand-drawn-animation';
import {
  drawInVariants,
  fadeInVariants,
  popInVariants,
  slideUpVariants,
} from './utils/animation-variants';
import { HandDrawnFilters } from './utils/hand-drawn-filters';

/**
 * ParallelPaths - Illustration for Racial Inequality section
 *
 * Visual metaphor: Four distinct paths representing different racial groups in Brazil.
 * Each path has different terrain, obstacles, and opportunities, showing how systemic
 * barriers create unequal outcomes despite people starting from the same place.
 *
 * Data reference (2022 IBGE/PNADCont):
 * - White: ~9.6% poverty rate (smoothest path)
 * - Mixed: ~28.6% poverty rate (moderate obstacles)
 * - Black: ~39.3% poverty rate (steep/rough terrain)
 * - Indigenous: ~28% poverty rate (also challenging, though limited sample size)
 */

interface ParallelPathsProps {
  data: RacialPoverty[];
  labels?: Record<string, string>;
  className?: string;
  ariaLabel?: string;
}

const LANE_YS = [28, 53, 78, 103];
const LANE_START_X = 18;
const LANE_END_X = 168;

const groupKey = (group: string) => {
  const normalized = group
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (normalized.includes('white') || normalized.includes('branco')) return 'white';
  if (normalized.includes('mixed') || normalized.includes('pardo')) return 'mixed';
  if (normalized.includes('black') || normalized.includes('negro')) return 'black';
  if (normalized.includes('indigen')) return 'indigenous';
  return 'other';
};

const groupOrder = ['white', 'mixed', 'black', 'indigenous', 'other'];

const groupColor = (group: string) => {
  const key = groupKey(group);
  if (key === 'white') return 'text-primary';
  if (key === 'mixed') return 'text-secondary';
  if (key === 'black') return 'text-destructive';
  if (key === 'indigenous') return 'text-accent';
  return 'text-muted-foreground';
};

const defaultLabel = (group: string) => {
  const key = groupKey(group);
  if (key === 'white') return 'White';
  if (key === 'mixed') return 'Mixed';
  if (key === 'black') return 'Black';
  if (key === 'indigenous') return 'Indigenous';
  return group.split(' ')[0] || group;
};

const normalize = (value: number, min: number, max: number) => {
  if (max === min) return 0.5;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
};

const jitter = (seed: number, min: number, max: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  const fraction = value - Math.floor(value);
  return min + fraction * (max - min);
};

const buildPath = (baseY: number, roughness: number, seed: number) => {
  const segments = 16;
  const step = (LANE_END_X - LANE_START_X) / segments;
  const points = Array.from({ length: segments + 1 }, (_, i) => {
    const x = LANE_START_X + i * step;
    const wobble =
      Math.sin((i + seed) * 0.9) * 0.6 + Math.cos((i + seed * 0.7) * 1.1) * 0.4;
    const offset = wobble * roughness * 0.6;
    return { x, y: baseY + offset };
  });

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const cp1x = prev.x + (curr.x - prev.x) * 0.5;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) * 0.5;
    const cp2y = curr.y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  return { d, points };
};

const getPathYAtX = (points: Array<{ x: number; y: number }>, x: number) => {
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    if (x >= prev.x && x <= curr.x) {
      const t = (x - prev.x) / (curr.x - prev.x);
      return prev.y + (curr.y - prev.y) * t;
    }
  }
  return points[points.length - 1]?.y ?? 0;
};

const buildRockPath = (x: number, y: number, size: number) => {
  const r = size;
  return `M ${x - r} ${y - r * 0.6}
    Q ${x - r * 0.3} ${y - r * 1.2}, ${x} ${y - r * 0.4}
    Q ${x + r * 0.7} ${y - r * 1}, ${x + r} ${y - r * 0.2}
    Q ${x + r * 1.1} ${y + r * 0.4}, ${x + r * 0.2} ${y + r * 0.8}
    Q ${x - r * 0.7} ${y + r * 0.9}, ${x - r} ${y + r * 0.3} Z`;
};

export function ParallelPaths({
  data,
  labels,
  className,
  ariaLabel,
}: ParallelPathsProps) {
  const {
    getDelay,
    getAnimationDuration,
    shouldReduceMotion: reduceMotion,
    easing,
  } = useHandDrawnAnimation({
    baseDelay: 0.15,
    staggerAmount: 0.08,
  });
  const drawSlow = getAnimationDuration('slow');
  const drawMedium = getAnimationDuration('medium');
  const popFast = getAnimationDuration('fast');

  const viewport = { once: false, margin: "-100px" };
  const sortedData = [...data].sort(
    (a, b) => groupOrder.indexOf(groupKey(a.group)) - groupOrder.indexOf(groupKey(b.group))
  );
  const trimmedData = sortedData.slice(0, LANE_YS.length);

  if (trimmedData.length === 0) return null;

  const povertyValues = trimmedData.map((item) => item.poverty_rate_percentage);
  const extremeValues = trimmedData.map((item) => item.extreme_poverty_rate_percentage);
  const minPoverty = Math.min(...povertyValues);
  const maxPoverty = Math.max(...povertyValues);
  const minExtreme = Math.min(...extremeValues);
  const maxExtreme = Math.max(...extremeValues);

  const laneSpan = LANE_END_X - LANE_START_X;

  return (
    <div className={`w-full max-w-md mx-auto mb-12 ${className ?? ''}`}>
      <svg
        viewBox="0 0 200 130"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={ariaLabel ?? 'Racial inequality visualization - parallel paths of opportunity'}
      >
        <defs>
          <HandDrawnFilters />
        </defs>

        {trimmedData.map((item, pathIndex) => {
          const povertyNorm = normalize(item.poverty_rate_percentage, minPoverty, maxPoverty);
          const extremeNorm = normalize(item.extreme_poverty_rate_percentage, minExtreme, maxExtreme);
          const roughness = 1 + povertyNorm * 7;
          const obstacles = Math.max(1, Math.round(1 + extremeNorm * 3));
          const stones = Math.max(2, Math.round(2 + povertyNorm * 5));
          const laneWidth = 9 + povertyNorm * 6;
          const colorClass = groupColor(item.group);
          const label = labels?.[item.group] ?? defaultLabel(item.group);
          const laneY = LANE_YS[pathIndex] ?? 28;
          const { d: pathD, points } = buildPath(laneY, roughness, pathIndex + 1);

          const obstaclePositions = Array.from({ length: obstacles }, (_, i) => {
            const base = LANE_START_X + ((i + 1) * laneSpan) / (obstacles + 1);
            return base + jitter(pathIndex * 10 + i, -6, 6);
          });

          const stonePositions = Array.from({ length: stones }, (_, i) => {
            const base = LANE_START_X + ((i + 1) * laneSpan) / (stones + 1);
            return {
              x: base + jitter(pathIndex * 20 + i, -8, 8),
              r: 1 + jitter(pathIndex * 30 + i, 0.4, 1.6),
            };
          });

          const hatchCount = Math.min(6, Math.max(2, Math.round(roughness)));
          const hatchLines = Array.from({ length: hatchCount }, (_, i) => {
            const base = LANE_START_X + ((i + 1) * laneSpan) / (hatchCount + 1);
            const x = base + jitter(pathIndex * 40 + i, -6, 6);
            const y = getPathYAtX(points, x) + jitter(pathIndex * 50 + i, -4, 4);
            const length = 3 + jitter(pathIndex * 60 + i, 0, 4);
            return { x, y, length };
          });

          const travelXs = reduceMotion
            ? LANE_END_X - 6
            : [LANE_START_X - 8, ...points.map((point) => point.x), LANE_END_X - 4];
          const travelYs = reduceMotion
            ? laneY
            : [laneY, ...points.map((point) => point.y), laneY];

          const difficultyDots = 4;
          const activeDots = Math.max(1, Math.round(1 + extremeNorm * (difficultyDots - 1)));

          return (
            <g key={`path-${item.group}`} className={colorClass}>
              {/* Lane base */}
              <motion.path
                d={pathD}
                stroke="currentColor"
                strokeWidth={laneWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeOpacity={0.6 + povertyNorm * 0.2}
                filter={reduceMotion ? undefined : 'url(#pencil-filter)'}
                pathLength={1}
                variants={drawInVariants(drawSlow, getDelay(0 + pathIndex * 3))}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              />

              {/* Main path line with sketchy effect */}
              <g>
                {/* Primary stroke */}
                <motion.path
                  d={pathD}
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  strokeOpacity={0.9}
                  pathLength={1}
                  variants={drawInVariants(drawSlow, getDelay(0.4 + pathIndex * 3))}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                />
                {/* Ghost stroke for hand-drawn effect */}
                <motion.path
                  d={pathD}
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  strokeOpacity={0.35}
                  transform="translate(0.5, -0.3)"
                  pathLength={1}
                  variants={drawInVariants(drawSlow, getDelay(0.4 + pathIndex * 3))}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                />
              </g>

              {/* Texture hatches */}
              {hatchLines.map((hatch, i) => (
                <motion.line
                  key={`hatch-${item.group}-${i}`}
                  x1={hatch.x - hatch.length / 2}
                  y1={hatch.y - 1}
                  x2={hatch.x + hatch.length / 2}
                  y2={hatch.y + 1}
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  strokeOpacity={0.2}
                  variants={fadeInVariants(drawMedium, getDelay(0.7 + pathIndex * 3 + i * 0.1))}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                />
              ))}

              {/* Obstacles (rocks/blocks) along the path */}
              {obstaclePositions.map((obsX, i) => {
                const obsY = getPathYAtX(points, obsX) - 1.5;
                const size = 3.5 + jitter(pathIndex * 70 + i, -0.6, 0.8);
                const rockPath = buildRockPath(obsX, obsY, size);
                return (
                  <motion.g
                    key={`obstacle-${item.group}-${i}`}
                    variants={popInVariants(popFast, getDelay(1.2 + pathIndex * 3 + i * 0.3))}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    transformBox="fill-box"
                    transformOrigin="center"
                  >
                    {/* Rock shape */}
                    <path
                      d={rockPath}
                      fill="currentColor"
                      fillOpacity="0.45"
                    />
                    {/* Rock outline */}
                    <path
                      d={rockPath}
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Rock ghost stroke */}
                    <path
                      d={rockPath}
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1.5"
                      strokeOpacity="0.2"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      transform="translate(0.4, -0.3)"
                    />
                  </motion.g>
                );
              })}

              {/* Small stones/roughness along path */}
              {stonePositions.map((stone, i) => {
                const stoneY = getPathYAtX(points, stone.x) + jitter(pathIndex * 80 + i, -2.5, 2.5);
                return (
                  <motion.circle
                    key={`stone-${item.group}-${i}`}
                    cx={stone.x}
                    cy={stoneY}
                    r={stone.r}
                    fill="currentColor"
                    fillOpacity="0.25"
                    variants={popInVariants(popFast, getDelay(1.5 + pathIndex * 3 + i * 0.12))}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    transformBox="fill-box"
                    transformOrigin="center"
                  />
                );
              })}

              {/* Person traveling on path */}
              <motion.g
                variants={popInVariants(popFast, getDelay(2 + pathIndex * 3))}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transformBox="fill-box"
                transformOrigin="center"
              >
                <motion.circle
                  cx={LANE_START_X - 8}
                  cy={laneY}
                  r="4"
                  fill="currentColor"
                  whileInView={{
                    cx: travelXs,
                    cy: travelYs,
                  }}
                  viewport={viewport}
                  transition={{
                    duration: reduceMotion ? 0 : 2.2 + roughness * 0.08,
                    delay: getDelay(2 + pathIndex * 3),
                    ease: roughness > 5 ? [0.3, 0.05, 0.3, 1] : easing.settle,
                  }}
                />
                <motion.circle
                  cx={LANE_START_X - 8}
                  cy={laneY}
                  r="5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                  vectorEffect="non-scaling-stroke"
                  whileInView={{
                    cx: travelXs,
                    cy: travelYs,
                  }}
                  viewport={viewport}
                  transition={{
                    duration: reduceMotion ? 0 : 2.2 + roughness * 0.08,
                    delay: getDelay(2 + pathIndex * 3),
                    ease: roughness > 5 ? [0.3, 0.05, 0.3, 1] : easing.settle,
                  }}
                />
              </motion.g>

              {/* Path label */}
              <motion.g
                variants={slideUpVariants(drawMedium, getDelay(2.6 + pathIndex * 3), 6)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transformBox="fill-box"
                transformOrigin="center"
              >
                <rect
                  x="170"
                  y={laneY - 6}
                  width="22"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  opacity="0.12"
                />
                <text
                  x="172"
                  y={laneY + 3}
                  className="text-[7px] font-semibold"
                  fill="currentColor"
                >
                  {label}
                </text>
              </motion.g>

              {/* Difficulty indicator (small dots showing obstacles) */}
              <motion.g
                variants={fadeInVariants(drawMedium, getDelay(2.9 + pathIndex * 3))}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {Array.from({ length: difficultyDots }).map((_, i) => (
                  <circle
                    key={`dot-${item.group}-${i}`}
                    cx={172 + i * 4}
                    cy={laneY + 10}
                    r="1.1"
                    fill="currentColor"
                    opacity={i < activeDots ? 0.65 : 0.2}
                  />
                ))}
              </motion.g>
            </g>
          );
        })}

      </svg>
    </div>
  );
}
