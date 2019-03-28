import * as Yup from "yup";

const registerSchemas = () =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Required"),
    password: Yup.string()
      .required("This field is required.")
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\\$%\\^&\\*])(?!.*\\s).{8,20}$/,
        {
          message:
            "Password must be 8-20 characters, must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (!@#$%^&*), and must not contain any spaces.",
          excludeEmptyString: true
        }
      ),
    confirmPassword: Yup.string()
      .required("This field is required.")
      .oneOf([Yup.ref("password")], ["Must match password."])
  });

registerSchemas.initialValues = {
  email: "",
  password: "",
  confirmPassword: ""
};

export { registerSchemas };
