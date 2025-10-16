import { useState, useEffect } from "react";

export default function useResponsive() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 500 && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
      setIsTablet(window.innerWidth > 500 && window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet };
}
