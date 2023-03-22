// Import required dependencies
import React, { useEffect } from "react";
import { Button, Alert, FormGroup, FormLabel } from "react-bootstrap";
import Auth from "../utils/auth";
import { ADD_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the SignupForm component
export default function SignupForm() {
  // Declare a mutation hook to perform the user signup
  const [signupMutation, { loading, error, data }] = useMutation(ADD_USER);

  // Define the initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Define the validation schema for the form
  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, "Too Short!").max(25, "Too Long!").required("Required Field"),
    email: Yup.string().email("Invalid email").required("Required Field"),
    password: Yup.string().min(6, "Password must contain at least 6 characters").max(50, "Too Long!").required("Required Field"),
  });

  // Handle form submission
  const handleFormSubmit = (values) => {
    signupMutation({
      variables: values,
    });
  };

  // Use the useEffect hook to log the user in after successful signup
  useEffect(() => {
    if (data?.addUser) {
      Auth.login(data.addUser.token);
    }
  }, [data]);

  return (
    <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleFormSubmit}>
      {({ errors, touched }) => (
        <Form>
          {
            // Display any error messages from the server
            error?.message && <Alert variant="danger">{error?.message}</Alert>
          }
          <FormGroup className="mb-3">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Field type="text" placeholder="Your username" name="username" className={`form-control ${errors.username && touched.username && "is-invalid"} `} />
            <ErrorMessage component="span" name="username" className="invalid-feedback" />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field role="email" type="email" placeholder="Your email" name="email" className={`form-control ${errors.email && touched.email && "is-invalid"} `} />
            <ErrorMessage component="span" name="email" className="invalid-feedback" />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field type="password" placeholder="Your password" name="password" className={`form-control ${errors.password && touched.password && "is-invalid"} `} />
            <ErrorMessage component="span" name="password" className="invalid-feedback" />
          </FormGroup>
          <Button type="submit" variant="dark">
            {loading ? "Loging..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
