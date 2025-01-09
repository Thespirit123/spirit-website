"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { GridLoader } from "react-spinners";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setMounted(true);
    const delay = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(delay);
  }, []);

  if (!mounted) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-0 flex items-center justify-center bg-[#071920] z-10 min-h-screen"
          >
            <GridLoader
              color="#009BC4"
              size={15}
              cssOverride={{ display: "block" }}
            />
          </motion.div>
        ) : (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
