import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'EN' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'PT-BR' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label="Change language">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="gap-2"
          >
            {lang.code === currentLang && <Check className="h-4 w-4" />}
            <span>{lang.nativeName}</span>
            <span className="text-muted-foreground text-xs">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
