"use client";
import { motion } from "framer-motion";
import { VimeoPlayer } from "../cloud-assets/VimeoPlayer";

export const InProgress = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen relative flex flex-col items-center justify-center"
  >
    <div className="w-full max-w-xl">
      <VimeoPlayer videoId="1045387169" className="w-full h-full" loop />
    </div>

    <div className="relative z-10 px-4 mt-8">
      <h1 className="text-2xl sm:text-3xl font-medium text-center">
        Under Construction
      </h1>
      <p className="mt-2 text-base sm:text-lg text-center">
        We&apos;re working hard to bring you something amazing. Check back soon!
      </p>
    </div>
  </motion.div>
);
