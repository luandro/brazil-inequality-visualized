// Type-safe translation keys based on en.json structure
export interface TranslationKeys {
  nav: {
    home: string;
    truth: string;
    poverty: string;
    labor: string;
    wealth: string;
    simulator: string;
    methodology: string;
    dataExplorer: string;
    deprecated: string;
  };
  narrative: {
    povertyLines: string;
    safetyNet: string;
    regional: string;
    racial: string;
  };
  app: {
    subtitle: string;
  };
  home: {
    hero: {
      truth: string;
      choices: string;
      consequences: string;
      description: string;
      exploreReality: string;
      runSimulations: string;
    };
    keyStats: {
      title: string;
      description: string;
      livingInPoverty: string;
      inExtremePoverty: string;
      incomeGini: string;
      ultraWealthy: string;
      povertyTooltip: string;
      extremePovertyTooltip: string;
      giniTooltip: string;
      ultraWealthyTooltip: string;
    };
    socialPrograms: {
      title: string;
      description: string;
      povertyRateComparison: string;
      withoutPrograms: string;
      withPrograms: string;
      extremePovertyComparison: string;
    };
    exploreData: {
      title: string;
      description: string;
      poverty: string;
      povertyDesc: string;
      labor: string;
      laborDesc: string;
      wealth: string;
      wealthDesc: string;
      simulator: string;
      simulatorDesc: string;
    };
    verifiedData: {
      title: string;
      description: string;
    };
  };
  truth: {
    title: string;
    description: string;
    sectionA: {
      title: string;
      description: string;
      povertyRate: string;
      peopleInPoverty: string;
      extremePovertyRate: string;
      incomeGini: string;
      povertyRateDesc: string;
      peopleInPovertyDesc: string;
      extremePovertyRateDesc: string;
      incomeGiniDesc: string;
      populationDistribution: string;
      extremePoverty: string;
      povertyNonExtreme: string;
      abovePovertyLine: string;
    };
    sectionB: {
      title: string;
      description: string;
      extremePovertyLine: string;
      povertyLine: string;
      extremePovertyLineDesc: string;
      povertyLineDesc: string;
    };
    sectionC: {
      title: string;
      description: string;
      povertyRateChart: string;
      withoutPrograms: string;
      current: string;
      extremePovertyChart: string;
    };
    sectionD: {
      title: string;
      description: string;
      chartTitle: string;
    };
    sectionE: {
      title: string;
      description: string;
      chartTitle: string;
    };
  };
  poverty: {
    title: string;
    description: string;
    measurementBasis: string;
    measurementBasisText: string;
    keyStatistics: {
      title: string;
      povertyRate: string;
      inPovertyMillions: string;
      extremePoverty: string;
      extremePoorMillions: string;
      giniCoefficient: string;
    };
    povertyLines: {
      title: string;
      description: string;
      extremePoverty: string;
      poverty: string;
      dailyUSD: string;
      monthlyBRL: string;
    };
    regionalDistribution: {
      title: string;
      description: string;
      chartTitle: string;
      detailsTitle: string;
      region: string;
      povertyRate: string;
      population: string;
    };
    racialDistribution: {
      title: string;
      description: string;
      chartTitle: string;
      poverty: string;
      extreme: string;
    };
  };
  labor: {
    title: string;
    description: string;
    keyInsight: {
      title: string;
      description: string;
    };
    dataTitle: string;
    employmentOverview: {
      title: string;
      employedPopulation: string;
      million: string;
      employedPopulationDesc: string;
      employmentRate: string;
      employmentRateDesc: string;
      unemploymentRate: string;
      unemploymentRateDesc: string;
    };
    laborChallenges: {
      title: string;
      informalityRate: string;
      informalityRateDesc: string;
      workingPoor: string;
      workingPoorDesc: string;
      monthlyIncomeMass: string;
      totalMonthlyIncome: string;
    };
    minimumWage: {
      title: string;
      evolutionChart: string;
      populationImpact: string;
      braziliansAffected: string;
      includesIndexed: string;
    };
    atAGlance: {
      title: string;
      employed: string;
      unemployed: string;
      informal: string;
      minWage2025: string;
    };
  };
  wealth: {
    title: string;
    description: string;
    measurementNotes: string;
    measurementNotesText: string;
    wealthInequality: {
      title: string;
      wealthGini: string;
      equal: string;
      unequal: string;
      comparison: string;
    };
    millionairePopulation: {
      title: string;
      description: string;
      totalMillionaires: string;
      individualsAbove: string;
      shareOfPopulation: string;
      millionairePercentage: string;
      wealthShare: string;
      wealthHeldByMillionaires: string;
      concentrationRatio: string;
      populationHolds: string;
    };
    billionairePopulation: {
      title: string;
      countTrend: string;
      dataTitle: string;
      additionalNotes: string;
      yearOverYear: string;
      contextTitle: string;
      notesText: string;
      context: string;
    };
    wealthGapVisualized: {
      title: string;
      wealthHeldBy: string;
      millionaires: string;
      everyoneElse: string;
      description: string;
    };
  };
  simulator: {
    title: string;
    description: string;
    disclaimer: {
      title: string;
      text: string;
    };
    baseline: {
      title: string;
      dataTitle: string;
      povertyLineDaily: string;
      povertyLineMonthly: string;
      povertyRate: string;
      inPoverty: string;
      millionaires: string;
    };
    controls: {
      title: string;
      taxBase: string;
      taxRate: string;
      complianceRate: string;
      adminCost: string;
      horizon: string;
      allocation: string;
      povertyGap: string;
      services: string;
      regionalFund: string;
      millionaires: string;
      billionaires: string;
    };
    results: {
      title: string;
      annualRevenue: string;
      totalOverYears: string;
      povertyGapCovered: string;
      estPeopleLifted: string;
      assumptions: string;
    };
  };
  dataExplorer: {
    title: string;
    description: string;
  };
  deprecated: {
    title: string;
    fieldName: string;
    reasonRemoved: string;
    rationale: string;
    fields: Record<string, { name: string; reason: string }>;
  };
  methodology: {
    title: string;
    description: string;
    lastUpdated: string;
    dataCurrency: string;
    dataCurrencyText: string;
    sourceCatalog: {
      title: string;
      id: string;
    };
    dataQuality: {
      title: string;
      reliabilityRatings: string;
      officialData: string;
      wealthEstimates: string;
      knownLimitations: string;
      ratings: {
        high: string;
        medium: string;
        low: string;
      };
      knownLimitationsItems: string[];
    };
  };
  common: {
    sources: string;
    viewSources: string;
    openMenu: string;
    close: string;
    learnMore: string;
    loading: string;
    dataValidationError: string;
    dataValidationErrorDesc: string;
    failedToLoad: string;
    noSourcesFound: string;
    reduction: string;
    percentagePoints: string;
    decrease: string;
    visitSource: string;
  };
  charts: {
    high: string;
    medium: string;
    low: string;
    povertyRate: string;
    extremePovertyRate: string;
    regionalPovertyDesc: string;
    racialPovertyDesc: string;
  };
  notFound: {
    title: string;
    message: string;
    returnHome: string;
  };
}

// Declare module augmentation for react-i18next
declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      en: TranslationKeys;
      'pt-BR': TranslationKeys;
    };
    defaultNS: 'translation';
    returnNull: false;
  }
}
