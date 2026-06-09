import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { Formik, Field, Form, FormikProps } from "formik";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import TextField from "~/components/Form/TextField";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import { useLogin } from "~/queries/auth";
import { LoginFormValues, LoginSchema } from "./loginSchema";
import axios from "axios";

const initialValues: LoginFormValues = { username: "", password: "" };

export default function PageLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: login, isLoading, error } = useLogin();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  const errorMessage = axios.isAxiosError(error)
    ? (error.response?.data as { message?: string } | undefined)?.message ??
      "Login failed"
    : undefined;

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      navigate(from, { replace: true });
    } catch {
      // error shown via useLogin().error
    }
  };

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center" mb={2}>
        Login
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {String(errorMessage)}
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }: FormikProps<LoginFormValues>) => (
          <Form autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="username"
                  label="Username"
                  fullWidth
                  autoComplete="username"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  autoComplete="current-password"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting || isLoading}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">
                  No account?{" "}
                  <Link component={RouterLink} to="/register">
                    Register
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </PaperLayout>
  );
}
