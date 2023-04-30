import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Hidden,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { LanguageToggle } from "components/common/LanguageToggle";
import Logo from "components/common/Logo";
import MobileNavbarDrawer from "components/common/MobileNavbarDrawer";
import { ThemeToggle } from "components/common/ThemeToggle";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";

export const Header = () => {
  const { t } = useTranslation("common");
  const { isAuth, profile } = useSelector(
    (state: ApplicationState) => state.user
  );

  const [isMobileNavbarDrawerOpen, setIsMobileNavbarDrawerOpen] =
    useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Box
      component="header"
      sx={{
        height: 60,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: "appBar",
        bgcolor: "background.default",
      }}
    >
      <Logo />
      <Box display="flex" alignItems="center">
        <LanguageToggle />
        <ThemeToggle />
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
            <Button onClick={() => handleSignOut()} variant="text">
              {t("signOut")}
            </Button>
          </Box>
        ) : (
          <Button variant="text" component={Link} href="/auth/sign-in">
            {t("signIn")}
          </Button>
        )}

        <Hidden smUp>
          <IconButton
            onClick={() => setIsMobileNavbarDrawerOpen((prev) => !prev)}
          >
            {!isMobileNavbarDrawerOpen ? (
              <MenuIcon fontSize="large" />
            ) : (
              <CloseIcon fontSize="large" />
            )}
          </IconButton>
        </Hidden>
      </Box>
      <MobileNavbarDrawer
        isDrawer={isMobileNavbarDrawerOpen}
        setIsDrawer={setIsMobileNavbarDrawerOpen}
      />
    </Box>
  );
};
