import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { Formik, Field, Form, FormikProps } from "formik";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TextField from "~/components/Form/TextField";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import { useRegister } from "~/queries/auth";
import { RegisterFormValues, RegisterSchema } from "../PageLogin/loginSchema";
import axios from "axios";

const initialValues: RegisterFormValues = RegisterSchema.cast({});

export default function PageRegister() {
  const navigate = useNavigate();
  const { mutateAsync: register, isLoading, error } = useRegister();

  const errorMessage = axios.isAxiosError(error)
    ? error.response?.data?.message ?? "Registration failed"
    : undefined;

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register(values);
      navigate("/login");
    } catch {
      // error shown via useRegister().error
    }
  };

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center" mb={2}>
        Register
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {String(errorMessage)}
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }: FormikProps<RegisterFormValues>) => (
          <Form autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  label="Name"
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
                  autoComplete="new-password"
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
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">
                  Already have an account?{" "}
                  <Link component={RouterLink} to="/login">
                    Login
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
