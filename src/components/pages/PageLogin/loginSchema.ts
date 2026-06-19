import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export type LoginFormValues = Yup.InferType<typeof LoginSchema>;

export const RegisterSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type RegisterFormValues = Yup.InferType<typeof RegisterSchema>;
