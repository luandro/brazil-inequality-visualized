import { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { chapters, routeToSection, sectionToRoute } from './ChapterNav';

interface UseScrollSyncOptions {
  enabled?: boolean;
}

export function useScrollSync({ enabled = true }: UseScrollSyncOptions = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const isScrollingToSection = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();
  const intersectingById = useRef<Record<string, boolean>>({});
  const activeSectionRef = useRef(activeSection);
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  const beginProgrammaticScroll = useCallback(() => {
    isScrollingToSection.current = true;
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      isScrollingToSection.current = false;
    }, 1000);
  }, []);

  // Scroll to section when route changes
  useEffect(() => {
    if (!enabled) return;

    const sectionId = routeToSection[location.pathname] || 'home';
    const element = document.getElementById(sectionId);

    // Skip scrolling if this update came from scroll-driven URL update
    const state = location.state as { scrollSync?: boolean } | null;
    const isScrollDriven = state?.scrollSync === true;

    if (element && !isScrollingToSection.current && !isScrollDriven) {
      beginProgrammaticScroll();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  }, [beginProgrammaticScroll, enabled, location.pathname, location.state]);

  // Update route when scrolling
  useEffect(() => {
    if (!enabled) return;

    intersectingById.current = {};

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // ~55% visibility required
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Update intersection state for each entry
      entries.forEach((entry) => {
        intersectingById.current[entry.target.id] = entry.isIntersecting;
      });

      // Compute active section deterministically: last intersecting chapter in order
      let newActiveSection: string | null = null;
      for (const chapter of chapters) {
        if (intersectingById.current[chapter.id]) {
          newActiveSection = chapter.id;
        }
      }

      if (!newActiveSection || newActiveSection === activeSectionRef.current) return;

      activeSectionRef.current = newActiveSection;
      setActiveSection(newActiveSection);

      // Update URL via navigate (scroll-driven update) without tearing down the observer
      const route = sectionToRoute[newActiveSection];
      if (route && route !== pathnameRef.current && !isScrollingToSection.current) {
        navigate(route, { replace: true, state: { scrollSync: true } });
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all sections
    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      isScrollingToSection.current = false;
    };
  }, [enabled, navigate]);

  // Scroll to a specific section (for chapter nav clicks)
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      beginProgrammaticScroll();

      // Update route via push (clicking = navigation)
      const route = sectionToRoute[sectionId];
      if (route) {
        navigate(route);
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  }, [beginProgrammaticScroll, navigate]);

  return { activeSection, scrollToSection };
}
