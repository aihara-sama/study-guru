import { Box, Button, Link as MuiLink } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import type { FunctionComponent } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";

interface IAuthProps {}

const Auth: FunctionComponent<IAuthProps> = () => {
  const { t } = useTranslation("common");
  const { isAuth, profile } = useSelector(
    (state: ApplicationState) => state.user
  );

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Box>
      {isAuth ? (
        <Box display="flex" alignItems="center" gap={1} ml={1}>
          <MuiLink href="/profile" component={Link} display="flex">
            <Image
              style={{ borderRadius: "50%" }}
              src={profile?.image}
              width={30}
              height={30}
              alt=""
            />
          </MuiLink>
          <Button onClick={() => handleSignOut()} variant="contained">
            {t("signOut")}
          </Button>
        </Box>
      ) : (
        <Button variant="text" component={Link} href="/auth/sign-in">
          {t("signIn")}
        </Button>
      )}
    </Box>
  );
};

export default Auth;
