"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const StairTransition = ({ children }: { children: React.ReactNode }) => {
  const stairsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const STAIR_COUNT = 5;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInitialMount = useRef(true);
  const previousPathname = useRef<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Set initial pathname securely on mount
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
    }

    const stairs = stairsRef.current?.children;
    if (!stairs) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (isInitialMount.current) {
      gsap.set(stairs, { yPercent: 0 });
      
      const tl = gsap.timeline({
        delay: 0.3,
      });

      tl.to(stairs, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.3,
          from: 'start',
        },
      });

      tl.eventCallback("onComplete", () => setIsAnimating(false));

      timelineRef.current = tl;
      isInitialMount.current = false;
      previousPathname.current = pathname;
    } else if (previousPathname.current !== pathname) {
      setIsAnimating(true);
      // On route change: close stairs (cover screen), then open (reveal new page)
      // Close stairs first
      const closeTL = gsap.timeline();
      closeTL.to(stairs, {
        yPercent: 0,
        duration: 0.3,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.25,
          from: 'start',
        },
      });

      const openTL = gsap.timeline({
        delay: 0.1,
      });
      openTL.to(stairs, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.3,
          from: 'start',
        },
      });

      const combinedTL = gsap.timeline()
        .add(closeTL)
        .add(openTL);
      
      combinedTL.eventCallback("onComplete", () => setIsAnimating(false));
      
      timelineRef.current = combinedTL;
      
      previousPathname.current = pathname;
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={stairsRef}
        className="fixed inset-0 z-50 pointer-events-none flex"
        aria-hidden="true"
      >
        {Array.from({ length: STAIR_COUNT }).map((_, index) => (
          <div
            key={index}
            className="flex-1 bg-foreground"
            style={{
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
      {!isAnimating && children}
    </>
  );
};

export default StairTransition;