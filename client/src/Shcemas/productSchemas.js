import * as Yup from "yup";

const getProductSchema = () =>
  Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .max(200),
    body: Yup.string()
      .required("Required")
      .max(500),
    price: Yup.number().required("Required"),
    contactPerson: Yup.string().required("Required"),
    companyId: Yup.number().min(1),
    phoneNumber: Yup.string().required("Required"),
    photoUrl: Yup.string().required("Required")
  });

getProductSchema.initialValues = {
  title: "",
  body: "",
  price: 0,
  contactPerson: "",
  phoneNumber: "",
  photoUrl: "",
  companyId: 0
};

export { getProductSchema };
