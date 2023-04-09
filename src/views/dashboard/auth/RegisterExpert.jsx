import React from "react";
import { Formik, Form, Field } from "formik";
import "swiper/swiper-bundle.min.css";
import InputText from "../../../components/InputText";
import PasswordInput from "../../../components/passwordInput";
import { Stack } from "@mui/material";
import { Box, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { registerExpertSchema } from "../../../schemas/user.schema";
import { registerExpert } from "../../../api/auth";
const RegisterExpert = () => {
  const userInitialValues = {
    fullName: "",
    password: "",
    email: "",
    birthDate: "",
    confirmPassword: "",
    gender: "male",
    address: "",
    city: "",
    role: "expert",
    expertise: null,
  };
  return (
    <Formik
      initialValues={userInitialValues}
      onSubmit={async (values, { errors, setErrors, setSubmitting }) => {
        console.log(values);
        try {
          const response = await registerExpert(values);
          console.log(response);
          if (response.status !== 200) {
            //email already exists
            setErrors({ email: "Email already exists" });
          }
          setSubmitting(false);
        } catch (err) {
          console.log(err);
        }
      }}
      validationSchema={registerExpertSchema}
    >
      {({
        isSubmitting,
        setFieldValue,
        values,
        errors,
        touched,
        handleBlur,
      }) => (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={8} md={12}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ mb: 2 }} />
              <Form enctype="multipart/form-data">
                <Stack sx={{ mt: 1 }} spacing={2}>
                  <Box sx={{ mb: 1 }} />
                  <Stack direction="row" spacing={2}>
                    <InputText
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      variant="outlined"
                      className="mt-4"
                    />
                    <InputText
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="w-50 mt-4"
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <PasswordInput
                      name="password"
                      placeholder="Password"
                      className="w-100 mt-4"
                      variant="outlined"
                    />
                    <PasswordInput
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-100 mt-4"
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction="row" className="my-4" spacing={2}>
                    <InputText
                      type="text"
                      name="address"
                      placeholder="Address"
                      variant="outlined"
                    />
                    <InputText
                      type="text"
                      name="city"
                      placeholder="City"
                      variant="outlined"
                    />
                  </Stack>

                  <div>
                    <span className="fs-6 mt-3" style={{ color: "#607d8b" }}>
                      Birthdate
                    </span>
                    <br />
                    <InputText
                      style={{ width: "100%" }}
                      type="date"
                      name="birthDate"
                      placeholder=""
                      className="w-full my-2"
                      variant="outlined"
                    />

                    <div id="my-radio-group">Gender :</div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" name="gender" value="male" />
                        male
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="female" />
                        female
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="expertise"
                      className="text-grey-500 mt-3 font-xsss fw-500 mt-0 mb-0 lh-32"
                    />
                    <input
                      accept="application/pdf"
                      type="file"
                      name="expertise"
                      onChange={(e) => {
                        setFieldValue("expertise", e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.expertise && touched.expertise && (
                      <div className="text-danger">
                        <span className="text-grey-500">
                          {errors.expertise}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 1,
                      mb: 2,
                    }}
                    type="submit"
                    className="bg-primary py-2 text-white fw-600"
                  >
                    Sign Up
                  </Button>

                  <h6
                    style={{
                      fontSize: "14px",
                      color: "#adb5bd",
                      fontWeight: "bold",
                    }}
                    className="text-grey-500 mt-3 font-xsss fw-500 mt-0 mb-0 lh-32"
                  >
                    Already have an account{" "}
                    <Link to="/auth/login" className="text-primary fw-600">
                      Login
                    </Link>
                  </h6>
                </Stack>
              </Form>
            </Box>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};
export default RegisterExpert;
