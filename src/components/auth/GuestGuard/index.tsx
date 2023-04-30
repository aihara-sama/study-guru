import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuth } = useSelector((state: ApplicationState) => state.user);

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isAuth) {
      router.replace((router.query.redirect as string) ?? "/profile");
    }
  }, [router.isReady, isAuth]);

  // The following route must be a public route e.g., Login page
  // So, the rendered HTML must be shown as soon as possible
  return <>{children}</>;
};

export default GuestGuard;
