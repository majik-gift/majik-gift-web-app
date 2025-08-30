import * as yup from "yup";

const shippingSchema = yup.object().shape({
  shipping_country: yup.mixed().required("Country is required"),

  shipping_state: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
    .required("State is required"),

  shipping_city: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
    .required("City is required"),

  shipping_postal_code: yup.string().trim().required("Postal code is required"),

  shipping_address: yup.string().trim().required("Address is required"),
  coupon_code: yup.string().trim().optional(),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export default shippingSchema;
