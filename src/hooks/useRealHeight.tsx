import { useEffect, useState } from "react";

export const useRealHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.clientHeight;
      setHeight(Math.min(windowHeight, documentHeight));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  return height;
};
