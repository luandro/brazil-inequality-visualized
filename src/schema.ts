import { z } from "zod";

export const ISODateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const NonEmptyString = z.string().min(1);

export const MetadataSchema = z.object({
  title: NonEmptyString,
  description: NonEmptyString,
  last_updated: ISODateString,
  data_currency: NonEmptyString,
  population_total_millions: z.number().positive(),
  currency: NonEmptyString,
});

export const SourceEntrySchema = z.object({
  name: NonEmptyString,
  publisher: NonEmptyString,
  year: z.number().int().min(1900).max(2100),
  url: z.string().url().optional(),
  notes: z.string().optional(),
});
export const SourceCatalogSchema = z.record(SourceEntrySchema);

export const PovertyKeyStatsSchema = z.object({
  poverty_rate_percentage: z.number().min(0).max(100),
  poverty_population_millions: z.number().min(0),
  extreme_poverty_rate_percentage: z.number().min(0).max(100),
  extreme_poverty_population_millions: z.number().min(0),
  gini_coefficient: z.number().min(0).max(1),
  source_ids: z.array(NonEmptyString).min(1),
});

export const PovertyLinesSchema = z.object({
  extreme_poverty_daily_usd_ppp: z.number().positive(),
  extreme_poverty_monthly_brl: z.number().positive(),
  poverty_daily_usd_ppp: z.number().positive(),
  poverty_monthly_brl: z.number().positive(),
  source_ids: z.array(NonEmptyString).min(1),
});

export const SocialProgramImpactSchema = z.object({
  poverty_rate_without_programs_percentage: z.number().min(0).max(100),
  extreme_poverty_rate_without_programs_percentage: z.number().min(0).max(100),
  poverty_reduction_percentage_points: z.number(),
  extreme_poverty_reduction_percentage_points: z.number(),
  source_ids: z.array(NonEmptyString).min(1),
});

export const RegionalPovertySchema = z.object({
  region: NonEmptyString,
  poverty_rate_percentage: z.number().min(0).max(100),
  population_millions: z.number().min(0),
  source_ids: z.array(NonEmptyString).min(1),
});

export const RacialPovertySchema = z.object({
  group: NonEmptyString,
  poverty_rate_percentage: z.number().min(0).max(100),
  extreme_poverty_rate_percentage: z.number().min(0).max(100),
  source_ids: z.array(NonEmptyString).min(1),
});

export const PovertySectionSchema = z.object({
  measurement_basis: NonEmptyString,
  official_key_statistics: PovertyKeyStatsSchema,
  poverty_lines: PovertyLinesSchema,
  social_programs_counterfactuals: SocialProgramImpactSchema,
  regional_distribution: z.array(RegionalPovertySchema),
  racial_distribution: z.array(RacialPovertySchema),
});

export const MinimumWageSectionSchema = z.object({
  wage_2024_brl: z.number().positive(),
  wage_2025_brl: z.number().positive(),
  effective_date_2025: ISODateString,
  population_affected_millions: z.number().min(0),
  source_ids: z.array(NonEmptyString).min(1),
});

export const LaborMarketSectionSchema = z.object({
  employed_population_millions: z.number().min(0),
  employment_rate_percentage: z.number().min(0).max(100),
  unemployment_rate_percentage: z.number().min(0).max(100),
  informality_rate_percentage: z.number().min(0).max(100),
  working_poor_percentage_of_employed: z.number().min(0).max(100),
  income_mass_monthly_brl_billions: z.number().min(0),
  source_ids: z.array(NonEmptyString).min(1),
});

export const MillionaireStatsSchema = z.object({
  threshold_usd: z.number().positive(),
  count_individuals: z.number().int().min(0),
  percentage_of_population: z.number().min(0).max(100),
  estimated_wealth_share_percentage: z.number().min(0).max(100),
  // Multi-millionaire fields ($10M+)
  multi_millionaire_threshold_usd: z.number().positive().optional(),
  multi_millionaire_count_individuals: z.number().int().min(0).optional(),
  multi_millionaire_percentage_of_population: z.number().min(0).max(100).optional(),
  source_ids: z.array(NonEmptyString).min(1),
});

export const BillionaireStatsSchema = z.object({
  count_2024: z.number().int().min(0),
  count_2025: z.number().int().min(0),
  notes: z.string(),
  source_ids: z.array(NonEmptyString).min(1),
});

export const WealthSectionSchema = z.object({
  measurement_notes: NonEmptyString,
  wealth_gini_coefficient: z.number().min(0).max(1),
  millionaire_population: MillionaireStatsSchema,
  billionaire_population: BillionaireStatsSchema,
});

export const DeprecatedFieldSchema = z.object({
  field_name: NonEmptyString,
  reason_removed: NonEmptyString,
});

export const DeprecatedSectionSchema = z.object({
  removed_fields: z.array(DeprecatedFieldSchema),
  rationale: NonEmptyString,
});

export const DataQualityNotesSchema = z.object({
  official_data_reliability: z.enum(["high", "medium", "low"]),
  wealth_estimate_reliability: z.enum(["high", "medium", "low"]),
  known_limitations: z.array(z.string()),
});

export const BrazilInequalityDatasetSchema = z.object({
  metadata: MetadataSchema,
  source_catalog: SourceCatalogSchema,
  poverty: PovertySectionSchema,
  minimum_wage: MinimumWageSectionSchema,
  labor_market: LaborMarketSectionSchema,
  wealth: WealthSectionSchema,
  removed_or_deprecated: DeprecatedSectionSchema,
  data_quality_notes: DataQualityNotesSchema,
});

export type BrazilInequalityDataset = z.infer<typeof BrazilInequalityDatasetSchema>;
export type SourceEntry = z.infer<typeof SourceEntrySchema>;
export type RegionalPoverty = z.infer<typeof RegionalPovertySchema>;
export type RacialPoverty = z.infer<typeof RacialPovertySchema>;
