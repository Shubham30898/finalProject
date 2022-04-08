import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment } from 'react/cjs/react.production.min'
import * as yup from 'yup'

function Signup() {
  const defaultValue = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    firstname: yup.string().required('Please enter your firstname'),
    lastname: yup.string().required('Please enter your lastname'),
    email: yup
      .string()
      .required('Please enter your email')
      .email('please enter valid email'),
    password: yup.string().required('please enter your password'),
  })

  const navigate = useNavigate()
  const handleSubmit = (values) => {
    console.log('values', values)
    axios
      .post('http://localhost:8080/user/signup', {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
      })
      .then((result) => {
        console.log(result)
        alert('Registerd Successfully')
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <div className="container ">
        <div className="col-md-8 text-center mt-5 border border-2 border-primary rounded">
          <h1 className="pt-2">Log In</h1>

          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="firstname"
                    placeholder="Enter Your First Name"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="firstname" />
                  </p>
                </div>

                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Enter Your Last Name"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="lastname" />
                  </p>
                </div>

                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter Your Email"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>
                </div>
                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="password"
                    placeholder="Enter Your password"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="password" />
                  </p>
                </div>
                <button className="btn btn-primary mx-5 mb-1" type="submit">
                  Register
                </button>

                <button
                  className="btn btn-primary mx-5 mb-1"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  )
}

export default Signup
