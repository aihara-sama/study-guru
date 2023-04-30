import GuestGuard from "components/auth/GuestGuard";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ResetPassword } from "components/auth/ResetPassword";
import { SplashScreen } from "components/common/SplashScreen";
import { getAuth, verifyPasswordResetCode } from "firebase/auth";
import { toast } from "react-hot-toast";

const ResetPasswordPage: NextPage = () => {
  const router = useRouter();
  const [isCodeValid, setIsCodeValid] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.oobCode) {
      router.replace("/auth/sign-in");
      return;
    }

    (async () => {
      try {
        await verifyPasswordResetCode(
          getAuth(),
          router.query.oobCode as string
        );
        setIsCodeValid(true);
      } catch (error) {
        toast.error("The reset link has expired or is invalid");
        router.replace("/auth/sign-in");
      }
    })();
  }, [router.isReady]);

  if (!isCodeValid) return <SplashScreen />;

  return (
    <GuestGuard>
      <Head>
        <title>Reset Password</title>
      </Head>
      <ResetPassword code={router.query.oobCode as string} />
    </GuestGuard>
  );
};

export default ResetPasswordPage;
