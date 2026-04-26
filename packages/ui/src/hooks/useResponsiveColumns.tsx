"use client"
import { useEffect, useState } from "react";

export function useResponsiveColumns(ideal: number) {
  const [columns, setColumns] = useState(ideal);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      let maxColumns;
      if (width < 455) maxColumns = 1;
      else if (width < 640) maxColumns = 2;
      else if (width < 1024) maxColumns = 3;
      else maxColumns = 4;

      setColumns(Math.min(ideal, maxColumns));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ideal]);

  return columns;
}