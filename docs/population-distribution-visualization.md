# Population Distribution Visualization

## Overview

The Population Distribution graph on the Truth page (Reality Dashboard) visualizes Brazil's wealth and poverty distribution in a single horizontal stacked bar chart.

## Data Sources

- **Poverty data**: IBGE PNAD 2023, World Bank Poverty Platform
- **Millionaire data**: Credit Suisse Global Wealth Report 2023
- **Billionaire data**: Forbes Billionaires List 2025

## Segments

1. **Extreme Poverty** (5.9%): Living below $2.15/day PPP
2. **Poverty (Non-Extreme)** (21.5%): Living between $2.15-$6.85/day PPP
3. **Above Poverty Line** (72.4%): Living above $6.85/day PPP
4. **Multi-Millionaires** (0.025%): Net worth ≥ $10M USD (~51,600 individuals)
5. **Billionaires** (0.00003%): Net worth ≥ $1B USD (69 individuals)

## Visual Design

### Color Scheme
- Extreme poverty: Red gradient (#destructive)
- Poverty: Amber gradient
- Above poverty: Cyan gradient (#secondary)
- Multi-millionaires: Gold/yellow gradient (bordered)
- Billionaires: Purple gradient (bordered)

### Accessibility
- Minimum segment width enforced for ultra-small percentages
- Hover tooltips provide exact numbers and people counts
- Responsive grid legend with color swatches
- Explanatory note about visual scaling
- ARIA-compatible title attributes

## Technical Implementation

### Component: `src/pages/Truth.tsx`
- Lines 123-215
- Uses Tailwind CSS gradients
- Responsive grid layout for legend (grid-cols-2 sm:grid-cols-3 md:grid-cols-5)
- i18next for bilingual translations

### Data Schema: `src/schema.ts`
- `MillionaireStatsSchema` includes multi-millionaire fields (lines 90-100)
- All new fields optional to maintain backward compatibility

### Translations: `src/i18n/`
- English: `en.json` (lines 83-84)
- Portuguese: `pt-BR.json` (lines 83-84)
- Keys under `truth.sectionA.multiMillionaires` and `truth.sectionA.billionaires`

## Calculations

### Multi-Millionaire Percentage
- Estimated count: 51,600 individuals (12.5% of total millionaires)
- Calculation: (51,600 / 203,100,000) × 100 = 0.025%

### Billionaire Percentage
- Count: 69 individuals (2025 Forbes data)
- Calculation: (69 / 203,100,000) × 100 = 0.00003%

### Adjusted Above Poverty
- Original above poverty line: 72.6%
- Subtract multi-millionaires: 0.025%
- Subtract billionaires: 0.00003%
- Result: ~72.575% (preventing double-counting)

## Responsive Behavior

### Mobile (< 640px)
- Legend displays in 2 columns
- Minimum widths ensure ultra-wealth segments visible
- Text truncates gracefully

### Tablet (640px - 1024px)
- Legend displays in 3 columns
- All segments clearly visible

### Desktop (> 1024px)
- Legend displays in 5 columns (one per segment)
- Optimal layout for all elements

## Maintenance Notes

- Multi-millionaire count estimated at 12.5% of total millionaire population
- Billionaire percentage calculated dynamically from latest Forbes data
- Visual scaling applied to segments <1% for visibility (minWidth enforcement)
- Update `src/data/dataset.json` when new wealth reports available
- Re-run build after data updates to ensure validation passes

## Future Enhancements

Potential improvements for consideration:

1. **Interactive Details**: Click segment to show detailed breakdown
2. **Historical Comparison**: Toggle to view distribution over time
3. **Regional Breakdown**: Filter distribution by Brazilian region
4. **Export Feature**: Download visualization as image or PDF
5. **Comparison Mode**: Compare Brazil to other countries
