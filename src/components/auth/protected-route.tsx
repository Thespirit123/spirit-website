import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "../loading";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/auth/login");
      }
    }, [user, loading, router]);

    if (loading) {
      return <Loading fullScreen text="Checking authentication..." />;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
