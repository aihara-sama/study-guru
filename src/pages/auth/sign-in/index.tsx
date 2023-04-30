import GuestGuard from "components/auth/GuestGuard";
import { SignIn } from "components/auth/SignIn";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const SignInPage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <GuestGuard>
      <Head>
        <title>{t("signIn")}</title>
      </Head>
      <SignIn />
    </GuestGuard>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default SignInPage;
