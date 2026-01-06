
import { useEffect, useRef } from 'react';

export const useRevealOnScroll = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('animate-reveal');
          observer.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, []);
};
