import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "components/common/Logo";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import React from "react";
import { toast } from "react-hot-toast";
import type { ResetPasswordRequest } from "types/auth";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";

interface IProps {
  code: string;
}

export const ResetPassword: FunctionComponent<IProps> = ({ code }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik<ResetPasswordRequest>({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Please enter password")
        .min(8, "Password must be minimum 8 characters"),
    }) as Yup.SchemaOf<ResetPasswordRequest>,
    onSubmit: async ({ password }, actions) => {
      actions.setSubmitting(true);
      try {
        await confirmPasswordReset(getAuth(), code, password);
        toast.success("New password has been set successfully");
        router.push("/auth/sign-in");
      } catch {
        toast.error("Something went wrong");
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
              Reset Password
            </Typography>
            <Stack spacing={2}>
              <TextField
                size="small"
                {...formik.getFieldProps("password")}
                {...getErrorProps(formik, "password")}
                label="New password"
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
            </Stack>
          </Stack>
          <Button
            sx={{ mt: 2 }}
            fullWidth
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            color="primary"
          >
            {formik.isSubmitting ? <CircularProgress /> : "Reset Password"}
          </Button>
        </Box>
      </Box>
    </FormikProvider>
  );
};
