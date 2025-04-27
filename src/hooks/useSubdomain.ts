import { useEffect, useState } from "react";

export const useSubdomain = () => {
  const [isConfessionsSubdomain, setIsConfessionsSubdomain] = useState(false);

  useEffect(() => {
    const checkSubdomain = () => {
      const host = window.location.host;
      const isConfessions = host.startsWith("confessions.");
      setIsConfessionsSubdomain(isConfessions);
    };

    checkSubdomain();
  }, []);

  return isConfessionsSubdomain;
};
