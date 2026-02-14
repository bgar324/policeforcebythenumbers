"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [animKey, setAnimKey] = useState(pathname);
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the animation on the very first render
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setAnimKey(pathname);
  }, [pathname]);

  return (
    <div key={animKey} className="page-fade-in">
      {children}
    </div>
  );
}
