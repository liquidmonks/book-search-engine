// Import required dependencies
import React, { useEffect } from 'react';
import { Button, Alert, FormGroup, FormLabel } from 'react-bootstrap';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the LoginForm component
export default function LoginForm() {
    // Use the LOGIN_USER mutation
    const [loginMutation, { loading, error, data }] = useMutation(LOGIN_USER);

    // Set the initial values for the form fields
    const initialValues = {
        email: '',
        password: '',
    }

    // Define the form validation schema using Yup
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required Field'),
        password: Yup.string().min(6, 'Password must contain at least 6 characters').max(50, 'Too Long!').required('Required Field'),
    });

    // Function to handle form submission
    const handleFormSubmit = (values) => {
        loginMutation({
            variables: values
        })
    };

    // Use the useEffect hook to log in the user if the data contains a login token
    useEffect(() => {
        if (data?.login) {
            Auth.login(data.login.token)
        }
    }, [data])

    // Render the login form using Formik
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleFormSubmit}
        >
            {
                ({ errors, touched }) => (
                    <Form>
                        {
                            error?.message && (
                                <Alert variant='danger'>
                                    {error?.message}
                                </Alert>
                            )
                        }
                        <FormGroup className='mb-3'>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Field
                                type='text'
                                placeholder='Your email'
                                name='email'
                                className={`form-control ${errors.email && touched.email && 'is-invalid'} `}
                            />
                            <ErrorMessage component='span' name='email' className='invalid-feedback' />
                        </FormGroup>

                        <FormGroup className='mb-3'>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Field
                                type='password'
                                placeholder='Your password'
                                name='password'
                                className={`form-control ${errors.password && touched.password && 'is-invalid'} `}
                            />
                            <ErrorMessage component='span' name='password' className='invalid-feedback' />
                        </FormGroup>
                        <Button
                            type='submit'
                            variant='dark'
                        >
                            {loading ? 'Loging...' : 'Login'}
                        </Button>
                    </Form>
                )
            }
        </Formik>
    );
};