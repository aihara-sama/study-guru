import GuestGuard from "components/auth/GuestGuard";
import type { NextPage } from "next";
import Head from "next/head";

import { ForgetPassword } from "components/auth/ForgetPassword";

const ForgetPasswordPage: NextPage = () => {
  return (
    <GuestGuard>
      <Head>
        <title>Forgot Password?</title>
      </Head>
      <ForgetPassword />
    </GuestGuard>
  );
};

export default ForgetPasswordPage;
