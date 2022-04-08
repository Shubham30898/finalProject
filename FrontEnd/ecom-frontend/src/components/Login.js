import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment } from 'react/cjs/react.production.min'
import * as yup from 'yup'

function Login() {
  const defaultValue = {
    email: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .email('please enter valid email'),
    password: yup.string().required('please enter your password'),
  })

  const navigate = useNavigate()
  const handleSubmit = (values) => {
    console.log(values.email)
    axios
      .post('http://localhost:8080/user/signin', {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.token === '1c2cba40-688b-4926-a2d2-dbd4abb97823') {
          console.log('Redirect to admin')

          //saving token in session
          sessionStorage.setItem(
            'token',
            '1c2cba40-688b-4926-a2d2-dbd4abb97823',
          )
          navigate('/admin')
          //reading token from session
          let token = sessionStorage.getItem('token')
          console.log(token)
        } else if (res.data.token.length) {
          console.log('Redirect to user')
          sessionStorage.setItem('token', res.data.token)
          navigate('/')
        }
      })
      .catch((error) => {
        alert('Wrong Credentials')
        navigate('/login')
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
                  Submit
                </button>

                <button
                  className="btn btn-primary mx-5 mb-1"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
