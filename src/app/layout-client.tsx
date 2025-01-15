"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Loading } from "@/components/loading";
import { AuthProvider } from "@/context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";

const queryClient = new QueryClient();

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
          <Loading text="Loading your experience..." />
        ) : (
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        )}
      </AnimatePresence>
    </>
  );
}
