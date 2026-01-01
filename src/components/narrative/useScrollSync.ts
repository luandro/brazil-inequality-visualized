import { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { chapters, routeToSection, sectionToRoute } from './ChapterNav';

export function useScrollSync() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const isScrollingToSection = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Scroll to section when route changes
  useEffect(() => {
    const sectionId = routeToSection[location.pathname] || 'home';
    const element = document.getElementById(sectionId);
    
    if (element && !isScrollingToSection.current) {
      isScrollingToSection.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset flag after scroll completes
      scrollTimeout.current = setTimeout(() => {
        isScrollingToSection.current = false;
      }, 1000);
    }
  }, [location.pathname]);

  // Update route when scrolling
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // ~55% visibility required
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingToSection.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          
          // Update URL without adding to history
          const route = sectionToRoute[sectionId];
          if (route && route !== location.pathname) {
            window.history.replaceState(null, '', `${import.meta.env.BASE_URL}${route.slice(1)}`);
          }
        }
      });
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
    };
  }, [location.pathname]);

  // Scroll to a specific section (for chapter nav clicks)
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isScrollingToSection.current = true;
      
      // Update route via push (clicking = navigation)
      const route = sectionToRoute[sectionId];
      if (route) {
        navigate(route);
      }
      
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      
      scrollTimeout.current = setTimeout(() => {
        isScrollingToSection.current = false;
      }, 1000);
    }
  }, [navigate]);

  return { activeSection, scrollToSection };
}
