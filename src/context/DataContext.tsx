import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrazilInequalityDatasetSchema, BrazilInequalityDataset, SourceEntry } from '@/schema';
import datasetJson from '@/data/dataset.json';

interface DataContextType {
  data: BrazilInequalityDataset | null;
  error: string | null;
  isLoading: boolean;
  getSource: (id: string) => SourceEntry | undefined;
  getSources: (ids: string[]) => SourceEntry[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BrazilInequalityDataset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const parsed = BrazilInequalityDatasetSchema.parse(datasetJson);
      setData(parsed);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Data validation failed: ${err.message}`);
      } else {
        setError('Unknown validation error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSource = (id: string): SourceEntry | undefined => {
    return data?.source_catalog[id];
  };

  const getSources = (ids: string[]): SourceEntry[] => {
    if (!data) return [];
    return ids.map(id => data.source_catalog[id]).filter(Boolean);
  };

  return (
    <DataContext.Provider value={{ data, error, isLoading, getSource, getSources }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
