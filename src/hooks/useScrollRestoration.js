// src/hooks/useScrollRestoration.js
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = {};

export default function useScrollRestoration(pageKey) {
  const location = useLocation();

  // 🧭 Save scroll before leaving page
  useEffect(() => {
    return () => {
      scrollPositions[pageKey] = window.scrollY;
    };
  }, [pageKey]);

  // 🕓 Restore scroll as soon as layout is ready
  useLayoutEffect(() => {
    const savedY = scrollPositions[pageKey];
    if (savedY !== undefined) {
      // small delay helps ensure images and sections have loaded
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedY,
          behavior: "instant", // no animation
        });
      });
    }
  }, [location.pathname, pageKey]);
}
