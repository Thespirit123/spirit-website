"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { AuthProvider } from "@/context/auth";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { GridLoader } from "react-spinners";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const isAuthPage = useMemo(() => {
    return pathname?.startsWith("/auth");
  }, [pathname]);

  useLayoutEffect(() => {
    setMounted(true);
    const delay = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(delay);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-0 flex items-center justify-center bg-[#071920] z-[100] min-h-screen"
          >
            <GridLoader
              color="#009BC4"
              size={15}
              cssOverride={{ display: "block" }}
            />
          </motion.div>
        ) : (
          <AuthProvider>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {!isAuthPage && <Navbar />}
              {children}
              {!isAuthPage && <Footer />}
            </motion.div>
          </AuthProvider>
        )}
      </AnimatePresence>
    </>
  );
}
