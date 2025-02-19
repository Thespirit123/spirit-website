"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Loading } from "@/components/loading";
import { AuthProvider } from "@/context/auth";
import { useSubdomain } from "@/hooks/useSubdomain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isConfessionsSubdomain = useSubdomain();

  const shouldHideNavAndFooter = useMemo(() => {
    return (
      pathname?.startsWith("/auth") ||
      pathname?.startsWith("/confessions") ||
      isConfessionsSubdomain
    );
  }, [pathname, isConfessionsSubdomain]);

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
          <Loading text="Loading your experience..." />
        ) : (
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {!shouldHideNavAndFooter && <Navbar />}
                {children}
                {!shouldHideNavAndFooter && <Footer />}
                <Toaster />
              </motion.div>
            </AuthProvider>
          </QueryClientProvider>
        )}
      </AnimatePresence>
    </>
  );
}
