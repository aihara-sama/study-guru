import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "components/common/Logo";
import { FirebaseError } from "firebase/app";
import type { AuthProvider } from "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import type { SignInRequest } from "types/auth";
import { facebookProvider, googleProvider } from "utils/firebase";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";

export const SignIn = () => {
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik<SignInRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
      password: Yup.string()
        .required("Please enter password")
        .min(8, "Password must be minimum 8 characters"),
    }) as Yup.SchemaOf<SignInRequest>,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await signInWithEmailAndPassword(
          getAuth(),
          values.email,
          values.password
        );
        router.replace(
          router.query.redirect ? (router.query.redirect as string) : "/"
        );
      } catch (error) {
        const errorMessage =
          error instanceof FirebaseError && error.code === "auth/wrong-password"
            ? "Incorrect email and/or password"
            : "Something went wrong";

        toast.error(errorMessage);
      } finally {
        actions.setSubmitting(false);
      }
    },
    validateOnMount: true,
  });

  const providerSignUp = async (provider: AuthProvider) => {
    try {
      await signInWithPopup(getAuth(), provider);
      router.replace(
        router.query.redirect ? (router.query.redirect as string) : "/"
      );
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <FormikProvider value={formik}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box component={Form} width={371}>
          <Stack gap={3}>
            <Box display="flex" justifyContent="center">
              <Logo />
            </Box>
            <Typography variant="h4" color="text.secondary" textAlign="center">
              {t("signIn")}
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                fullWidth
                onClick={() => providerSignUp(googleProvider)}
                startIcon={<GoogleIcon />}
              >
                Google
              </Button>
              <Button
                onClick={() => providerSignUp(facebookProvider)}
                fullWidth
                startIcon={<FacebookIcon />}
              >
                Facebook
              </Button>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Divider sx={{ flex: 1 }} />
              <Typography fontWeight={500} color="text.secondary">
                Or
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>
            <Stack spacing={2}>
              <TextField
                size="small"
                {...formik.getFieldProps("email")}
                {...getErrorProps(formik, "email")}
                fullWidth
                label="Email"
                type="email"
              />
              <Box>
                <TextField
                  size="small"
                  {...formik.getFieldProps("password")}
                  {...getErrorProps(formik, "password")}
                  label="Password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  display="flex"
                  variant="caption"
                  color="text.secondary"
                  justifyContent="end"
                  mt={0.2}
                >
                  <MuiLink
                    underline="none"
                    component={Link}
                    href="/auth/forget-password"
                  >
                    Forgot password?
                  </MuiLink>
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Button
            sx={{ mt: 2 }}
            fullWidth
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            color="primary"
          >
            {formik.isSubmitting ? <CircularProgress /> : t("signIn")}
          </Button>
          <Typography mt={1} variant="caption" color="text.secondary">
            Still don&apos;t have an account?{" "}
            <MuiLink underline="none" component={Link} href="/auth/sign-up">
              Sign Up
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </FormikProvider>
  );
};
