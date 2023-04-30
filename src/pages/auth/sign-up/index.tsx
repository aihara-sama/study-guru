import GuestGuard from "components/auth/GuestGuard";
import SignUp from "components/auth/SignUp";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const SignUpPage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <GuestGuard>
      <Head>
        <title>{t("signUp")}</title>
      </Head>
      <SignUp />
    </GuestGuard>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default SignUpPage;
