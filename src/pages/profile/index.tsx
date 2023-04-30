import { Box, Typography } from "@mui/material";
import AuthGuard from "components/auth/AuthGuard";
import { Layout } from "components/common/Layout";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";

const Profile = () => {
  const { profile } = useSelector((state: ApplicationState) => state.user);

  return (
    <AuthGuard>
      <Layout>
        <Box pt={2}>
          <Typography variant="h2">Profile</Typography>
          <Box>
            <Typography>Hello,</Typography>
            <Typography fontWeight={500}>{profile?.name}</Typography>
          </Box>
        </Box>
      </Layout>
    </AuthGuard>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default Profile;
