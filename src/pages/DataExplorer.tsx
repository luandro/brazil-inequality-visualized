import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useData } from '@/context/DataContext';
import { ChevronRight, ChevronDown, AlertTriangle, Database } from 'lucide-react';

function TreeNode({ name, value, path }: { name: string; value: unknown; path: string }) {
  const [expanded, setExpanded] = useState(false);
  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);

  return (
    <div className="ml-4">
      <button onClick={() => isObject && setExpanded(!expanded)} className={`flex items-center gap-1 py-1 text-sm hover:text-secondary transition-colors ${isObject ? 'cursor-pointer' : 'cursor-default'}`}>
        {isObject ? (expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />) : <span className="w-4" />}
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

export default function DataExplorer() {
  const { data, isLoading, error } = useData();
  if (isLoading) return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div></Layout>;
  if (error || !data) return <Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="glass-card p-8"><AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" /><p>{error}</p></div></div></Layout>;

  return (
    <Layout>
      <section className="py-12 md:py-20"><div className="container-wide">
        <h1 className="text-display mb-4 flex items-center gap-3"><Database className="w-10 h-10" /> Data Explorer</h1>
        <p className="text-body-lg text-muted-foreground max-w-3xl">Full tree view of the validated dataset. Every field in the JSON is exposed here.</p>
      </div></section>
      <section className="py-8"><div className="container-wide">
        <div className="glass-card p-6 font-mono text-sm overflow-auto max-h-[70vh]">
          {Object.entries(data).map(([k, v]) => <TreeNode key={k} name={k} value={v} path={k} />)}
        </div>
      </div></section>
    </Layout>
  );
}
