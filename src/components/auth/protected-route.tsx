"use client";

import { useAuth } from "@/hooks/useAuth";
import { getSelectedPlatform } from "@/lib/platform-storage";
import { AlertTriangle, ArrowRight, Loader2, Shield } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

export type WithAuthProps = Record<string, never>;

interface WithAuthOptions {
  adminOnly?: boolean;
}

const AuthLoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-[#008EA8]" />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Authenticating
        </h3>
        <p className="text-sm text-gray-600">
          Verifying your credentials...
        </p>
      </div>
    </div>
  </div>
);

const UnauthorizedLoader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4 border-l-4 border-red-500">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-6 w-6 text-red-500" />
        <Loader2 className="h-5 w-5 animate-spin text-red-500" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Access Denied
        </h3>
        <p className="text-sm text-gray-600">
          You don&apos;t have permission to access this page. Redirecting...
        </p>
      </div>
    </div>
  </div>
);

const PlatformRedirectLoader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4 border-l-4 border-blue-500">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-blue-500" />
        <ArrowRight className="h-5 w-5 animate-pulse text-blue-500" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Platform Selection Required
        </h3>
        <p className="text-sm text-gray-600">
          Redirecting to platform selection...
        </p>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithAuthOptions
): ComponentType<P & WithAuthProps> {
  const ComponentWithAuth = (props: P) => {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.replace(`/auth/login?redirect=${pathname}`);
          return;
        }

        if (options?.adminOnly && !isAdmin) {
          router.replace("/dashboard");
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
    }, [user, loading, router, pathname, isAdmin]);

    if (loading || !user) {
      return <AuthLoadingSpinner />;
    }

    if (options?.adminOnly && !isAdmin) {
      return <UnauthorizedLoader />;
    }

    const selectedPlatform = getSelectedPlatform();
    if (!selectedPlatform && pathname !== "/select-platform") {
      return <PlatformRedirectLoader />;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

  return ComponentWithAuth;
}