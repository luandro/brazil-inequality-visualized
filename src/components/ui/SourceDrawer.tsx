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
import { useTranslation } from 'react-i18next';

interface SourceDrawerProps {
  sourceIds: string[];
  title?: string;
  definition?: string;
  showLabel?: boolean;
}

export function SourceDrawer({ sourceIds, title, definition, showLabel = true }: SourceDrawerProps) {
  const { t } = useTranslation();
  const { getSources, data } = useData();
  const sources = getSources(sourceIds);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-muted-foreground hover:text-secondary"
          aria-label={title ? `${title} - ${t('common.viewSources')}` : t('common.viewSources')}
        >
          <Info className="w-4 h-4" />
          {showLabel && <span className="ml-1 text-xs">{t('common.sources')}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title || t('common.sources')}</SheetTitle>
          {definition && (
            <SheetDescription className="text-left">
              {definition}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t('methodology.sourceCatalog.title')}
          </h4>

          {sources.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('common.noSourcesFound', { ids: sourceIds.join(', ') })}</p>
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
                    {t('methodology.sourceCatalog.id', { id: sourceIds[index] })}
                  </p>
                </div>
              ))}
            </div>
          )}

          {data && (
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {t('methodology.dataCurrency')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('methodology.dataCurrencyText')}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {t('methodology.lastUpdated', { date: data.metadata.last_updated })}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
