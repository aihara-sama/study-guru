import MenuIcon from "@mui/icons-material/Menu";
import { Box, Hidden, IconButton, Typography } from "@mui/material";
import Logo from "components/common/Logo";
import MobileNavbarDrawer from "components/common/MobileNavbarDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";
import Auth from "./Auth";

export const Header = () => {
  const [isMobileNavbarDrawerOpen, setIsMobileNavbarDrawerOpen] =
    useState<boolean>(false);

  const { heroImage } = useSelector((state: ApplicationState) => state.app);

  return (
    <Box
      component="header"
      sx={{
        height: 420,
        backgroundImage: `url(${heroImage})`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "::after": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <Box
        sx={{
          height: 80,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
        component="nav"
      >
        <Logo />
        <Box display="flex" alignItems="center">
          <Auth />
          <Hidden smUp>
            <IconButton
              onClick={() => setIsMobileNavbarDrawerOpen((prev) => !prev)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Hidden>
        </Box>
        {isMobileNavbarDrawerOpen && (
          <MobileNavbarDrawer
            isDrawer={isMobileNavbarDrawerOpen}
            setIsDrawer={setIsMobileNavbarDrawerOpen}
          />
        )}
      </Box>
      <Box
        flex={1}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={2}
        zIndex={1}
      >
        <Typography
          textAlign="center"
          variant="h1"
          color="primary.contrastText"
          letterSpacing={2}
          fontSize={64}
        >
          NEVER STOP LEARNING
        </Typography>
      </Box>
    </Box>
  );
};
