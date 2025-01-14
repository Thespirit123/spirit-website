"use client";

import { motion } from "framer-motion";
import { GridLoader } from "react-spinners";

interface LoadingProps {
  fullScreen?: boolean;
  color?: string;
  size?: number;
  text?: string;
}

export const Loading = ({
  fullScreen = true,
  color = "#009BC4",
  size = 15,
  text,
}: LoadingProps) => {
  const containerClass = fullScreen
    ? "fixed inset-0 top-0 min-h-screen"
    : "w-full h-full min-h-[200px]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${containerClass} flex flex-col items-center justify-center bg-[#071920] z-[100]`}
      role="alert"
      aria-label="Loading content"
    >
      <GridLoader
        color={color}
        size={size}
        cssOverride={{ display: "block" }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-white text-sm"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
};
