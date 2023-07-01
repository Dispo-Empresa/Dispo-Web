import { useState } from "react";

import validate from "./validations";

const initialState = {
  name: "",
  contactName: "",
  contactTitle: "",
  cnpj: "",
  email: "",
  phone: "",

  // adress

  country: "",
  uf: "",
  city: "",
  district: "",
  cep: "",
  additionalInfo: "",
};

function useFields() {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({
    name: "",
    contactName: "",
    contactTitle: "",
    cnpj: "",
    email: "",
    phone: "",
    country: "",
    uf: "",
    city: "",
    district: "",
    cep: "",
    additionalInfo: "",
  });
  const requiredFields = [
    "name",
    "contactName",
    "contactTitle",
    "cnpj",
    "email",
    "phone",
    "country",
    "uf",
    "district",
    "cep",
  ];

  const handleValidateRequiredFields = () => {
    return requiredFields.filter((field) => fields[field] === "").length > 0;
  };

  const handleValidateErrorFields = () => {
    return Object.values(errors).find((error) => Boolean(error)) || null;
  };

  const handleClearFields = () => {
    setFields({ ...initialState });
  };

  const handleFieldChange = (fieldName, value) => {
    //setErrors((prevFields) => ({
    //  ...prevFields,
    //  [fieldName]: validate(fieldName, value),
    //}));

    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return [
    fields,
    errors,
    handleValidateRequiredFields,
    handleValidateErrorFields,
    handleClearFields,
    handleFieldChange,
  ];
}

export default useFields;
