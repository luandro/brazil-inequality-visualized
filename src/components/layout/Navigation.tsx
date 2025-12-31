import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, BarChart3, Users, Briefcase, Coins, Calculator, BookOpen, Database, Archive } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const navItems = [
  { path: '/truth', labelKey: 'nav.truth', icon: BarChart3 },
  { path: '/poverty', labelKey: 'nav.poverty', icon: Users },
  { path: '/labor', labelKey: 'nav.labor', icon: Briefcase },
  { path: '/wealth', labelKey: 'nav.wealth', icon: Coins },
  { path: '/simulator', labelKey: 'nav.simulator', icon: Calculator },
  { path: '/methodology', labelKey: 'nav.methodology', icon: BookOpen },
  { path: '/data', labelKey: 'nav.dataExplorer', icon: Database },
];

export function Navigation() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-cyan-400 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              {t('app.subtitle')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(item.labelKey)}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-secondary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label={t('common.openMenu')}>
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-cyan-400 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">T</span>
                  </div>
                  <span className="font-semibold">{t('nav.home')}</span>
                </Link>
                
                <div className="h-px bg-border" />
                
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-secondary/10 text-secondary'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{t(item.labelKey)}</span>
                    </Link>
                  );
                })}
                
                <div className="h-px bg-border" />
                
                <Link
                  to="/deprecated"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  <Archive className="w-5 h-5" />
                  <span className="font-medium">{t('nav.deprecated')}</span>
                </Link>

                <div className="h-px bg-border" />

                <div className="px-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
