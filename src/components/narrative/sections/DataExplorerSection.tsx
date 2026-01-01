import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '@/context/DataContext';
import { ChevronRight, ChevronDown, Database } from 'lucide-react';
import { NarrativeSection } from '../NarrativeSection';

function TreeNode({ name, value, path }: { name: string; value: unknown; path: string }) {
  const [expanded, setExpanded] = useState(false);
  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);

  return (
    <div className="ml-4">
      <button 
        onClick={() => isObject && setExpanded(!expanded)} 
        className={`flex items-center gap-1 py-1 text-sm hover:text-secondary transition-colors ${isObject ? 'cursor-pointer' : 'cursor-default'}`}
        aria-expanded={isObject ? expanded : undefined}
      >
        {isObject ? (
          expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        ) : (
          <span className="w-4" />
        )}
        <span className="font-medium text-foreground">{name}</span>
        {!isObject && <span className="text-muted-foreground ml-2">: {JSON.stringify(value)}</span>}
        {isArray && <span className="text-xs text-muted-foreground ml-1">[{(value as unknown[]).length}]</span>}
      </button>
      {expanded && isObject && Object.entries(value as Record<string, unknown>).map(([k, v]) => (
        <TreeNode key={k} name={k} value={v} path={`${path}.${k}`} />
      ))}
    </div>
  );
}

export function DataExplorerSection() {
  const { t } = useTranslation();
  const { data } = useData();
  const prefersReducedMotion = useReducedMotion();

  if (!data) return null;

  return (
    <NarrativeSection id="data" ariaLabel="Data Explorer" className="py-16 md:py-24 bg-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          <h2 className="text-display mb-4 flex items-center gap-3">
            <Database className="w-10 h-10" /> {t('dataExplorer.title')}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mb-8">
            {t('dataExplorer.description')}
          </p>
        </motion.div>

        <motion.div 
          className="glass-card p-6 font-mono text-sm overflow-auto max-h-[70vh]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ }}
        >
          {Object.entries(data).map(([k, v]) => (
            <TreeNode key={k} name={k} value={v} path={k} />
          ))}
        </motion.div>
      </div>
    </NarrativeSection>
  );
}
