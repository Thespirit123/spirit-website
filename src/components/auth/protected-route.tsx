import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "../loading";

interface WithAuthOptions {
  adminOnly?: boolean;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  return function WithAuthComponent(props: P) {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (loading) {
        return;
      }

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      if (options.adminOnly && isAdmin !== true) {
        router.replace("/");
        return;
      }
    }, [user, loading, isAdmin, router, options.adminOnly]);

    if (loading) {
      return <Loading fullScreen text="Checking authentication..." />;
    }

    if (!user || (options.adminOnly && isAdmin !== true)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}