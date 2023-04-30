import { SplashScreen } from "components/common/SplashScreen";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);
  const { isAuth } = useSelector((state: ApplicationState) => state.user);

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!isAuth) {
      router.replace({
        pathname: "/auth/sign-in",
        query: { redirect: router.asPath },
      });
    } else {
      setChecked(true);
    }
  }, [isAuth, router.isReady]);

  // The following route is a private route.
  // So, we should not show any content from the rendered page
  // In this case, we will show Splash Screen component
  if (!checked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AuthGuard;
