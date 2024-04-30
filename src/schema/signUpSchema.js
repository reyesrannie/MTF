import * as Yup from "yup";

const signUpSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  country: Yup.string().required("Please select country code"),
  number: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{3} \d{3} \d{4}$/, "Mobile number must be 10 digits"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .min(8, "Password must be at least 8 characters")
    .oneOf([Yup.ref("password")], "Confirm password doesn't match"),
}).required();

export default signUpSchema;
