import { Info, ExternalLink } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';

interface SourceDrawerProps {
  sourceIds: string[];
  title?: string;
  definition?: string;
}

export function SourceDrawer({ sourceIds, title = 'Sources', definition }: SourceDrawerProps) {
  const { getSources, data } = useData();
  const sources = getSources(sourceIds);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-muted-foreground hover:text-secondary"
          aria-label="View sources"
        >
          <Info className="w-4 h-4" />
          <span className="ml-1 text-xs">Sources</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {definition && (
            <SheetDescription className="text-left">
              {definition}
            </SheetDescription>
          )}
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Data Sources
          </h4>
          
          {sources.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sources found for IDs: {sourceIds.join(', ')}</p>
          ) : (
            <div className="space-y-4">
              {sources.map((source, index) => (
                <div
                  key={sourceIds[index]}
                  className="p-4 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-medium text-foreground">{source.name}</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {source.publisher} • {source.year}
                      </p>
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary/80 transition-colors"
                        aria-label={`Visit ${source.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {source.notes && (
                    <p className="text-sm text-muted-foreground mt-2 pt-2 border-t border-border/50">
                      {source.notes}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground/70 mt-2 font-mono">
                    ID: {sourceIds[index]}
                  </p>
                </div>
              ))}
            </div>
          )}

          {data && (
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Data Currency
              </h4>
              <p className="text-sm text-muted-foreground">
                {data.metadata.data_currency}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Last updated: {data.metadata.last_updated}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
