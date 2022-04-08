import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment } from 'react/cjs/react.production.min'
import * as yup from 'yup'

function Address() {
  const navigate = useNavigate()
  var token = sessionStorage.getItem('token')

  const defaultValue = {
    address: '',
    city: '',
    state: '',
    pincode: '',
  }

  const validationSchema = yup.object().shape({
    address: yup.string().required('Please enter address'),
    city: yup.string().required('Please enter city name'),
    state: yup.string().required('Please enter state'),
    pincode: yup
      .number()
      .test(
        'maxDigits',
        'pincode must have exactly 6 digits',
        (number) => String(number).length === 6,
      ),
  })

  const handleSubmit = (values) => {
    console.log('values', values)
    axios
      .post(`http://localhost:8080/address/add/?token=${token}`, {
        addressLine1: values.address,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
      })
      .then((res) => {
        console.log(res.data)
        navigate('/payment')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <div className="container ">
        <div className="col-md-8 text-center mt-5 border border-2 border-primary rounded">
          <h1 className="pt-2">Add Address</h1>

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
                    name="address"
                    placeholder="Enter Address"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="address" />
                  </p>
                </div>

                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="city" />
                  </p>
                </div>

                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="state" />
                  </p>
                </div>

                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="number"
                    name="pincode"
                    placeholder="Enter Pincode"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="pincode" />
                  </p>
                </div>

                <button className="btn btn-primary mx-5 mb-1" type="submit">
                  Add Address
                </button>
              </Form>
            )}
          </Formik>
          <button
            className="btn btn-primary mx-5 mb-1"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default Address
