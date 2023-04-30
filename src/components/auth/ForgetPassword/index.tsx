import {
  Box,
  Button,
  CircularProgress,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "components/common/Logo";
import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Form, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import type { ForgetPasswordRequest } from "types/auth";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";

export const ForgetPassword = () => {
  const router = useRouter();

  const formik = useFormik<ForgetPasswordRequest>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter email"),
    }) as Yup.SchemaOf<ForgetPasswordRequest>,
    onSubmit: async ({ email }, actions) => {
      actions.setSubmitting(true);
      try {
        await sendPasswordResetEmail(getAuth(), email);
        toast.success("Password reset link has been sent to your email");
        router.push("/auth/sign-in");
      } catch (error) {
        const errorMessage =
          error instanceof FirebaseError && error.code === "auth/user-not-found"
            ? "User with this email does not exist"
            : "Something went wrong";

        toast.error(errorMessage);
      } finally {
        actions.setSubmitting(false);
      }
    },
    validateOnMount: true,
  });

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
              Forgot Password?
            </Typography>
            <Box>
              <TextField
                size="small"
                {...formik.getFieldProps("email")}
                {...getErrorProps(formik, "email")}
                fullWidth
                label="Email"
                type="email"
              />
              <Box display="flex" justifyContent="end">
                <Typography mt={1} variant="caption" color="text.secondary">
                  <MuiLink
                    underline="none"
                    component={Link}
                    href="/auth/sign-in"
                  >
                    Back to login
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Button
            sx={{ mt: 2 }}
            fullWidth
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            color="primary"
          >
            {formik.isSubmitting ? <CircularProgress /> : "Submit"}
          </Button>
        </Box>
      </Box>
    </FormikProvider>
  );
};
