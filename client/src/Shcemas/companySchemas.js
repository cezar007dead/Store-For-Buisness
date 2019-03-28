import * as Yup from "yup";

const getCompanySchemas = () =>
  Yup.object().shape({
    companyName: Yup.string().required("Required"),
    companyId: Yup.string().required("Required"),
    description: Yup.string()
      .required("Required")
      .max(500),
    photoUrl: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required")
  });

getCompanySchemas.initialValues = {
  companyName: "",
  companyId: 0,
  description: "",
  photoUrl: "",
  phoneNumber: ""
};

export { getCompanySchemas };
