import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SliderWithValueProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  tooltip?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function SliderWithValue({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  label,
  tooltip,
  formatValue,
  className
}: SliderWithValueProps) {
  const [isHovering, setIsHovering] = useState(false);

  const displayValue = formatValue ? formatValue(value[0]) : value[0];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          {tooltip && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <motion.span
          className="text-sm font-bold text-secondary px-2 py-1 bg-secondary/10 rounded"
          key={value[0]}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.2 }}
        >
          {displayValue}
        </motion.span>
      </div>
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Slider
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
          className="mt-2"
        />
      </div>
    </div>
  );
}
