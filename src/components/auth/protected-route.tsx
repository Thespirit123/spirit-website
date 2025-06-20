"use client";

import { useAuth } from "@/hooks/useAuth";
import { getSelectedPlatform } from "@/lib/platform-storage";
import { usePathname, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { Text } from "../custom-ui/text";

export type WithAuthProps = Record<string, never>;

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithAuthProps> {
  const ComponentWithAuth = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.replace(`/auth/login?redirect=${pathname}`);
          return;
        }

        const platform = getSelectedPlatform();
        if (!platform) {
          if (pathname !== "/select-platform") {
            router.replace("/select-platform");
          }
          return;
        }

        if (platform === "affiliate" && pathname === "/utilities") {
          router.replace("/dashboard");
        } else if (platform === "utilities" && pathname === "/dashboard") {
          router.replace("/utilities");
        } else if (platform && pathname === "/select-platform") {
          if (platform === "affiliate") router.replace("/dashboard");
          else if (platform === "utilities") router.replace("/utilities");
        }
      }
    }, [user, loading, router, pathname]);

    if (loading || !user) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Text>Loading authentication status...</Text>
        </div>
      );
    }

    const selectedPlatform = getSelectedPlatform();
    if (!selectedPlatform && pathname !== "/select-platform") {
      return (
        <div className="flex items-center justify-center h-screen">
          <Text>Redirecting to platform selection...</Text>
        </div>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

  return ComponentWithAuth;
}