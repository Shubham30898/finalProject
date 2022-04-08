import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment } from 'react/cjs/react.production.min'
import * as yup from 'yup'

function CreateProducts() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const defaultValue = {
    productname: '',
    imageurl: '',
    price: '',
    description: '',
  }

  const validationSchema = yup.object().shape({
    productname: yup.string().required('Please enter product name'),
    imageurl: yup.string().required('Please enter image URL'),
    price: yup
      .number()
      .required('Please enter product price')
      .test(
        'Is positive?',
        'ERROR: The price must be greater than 0!',
        (value) => value > 0,
      ),
    description: yup.string().required('please enter product description'),
  })

  const handleSubmit = (values) => {
    console.log('values', values)
    axios
      .post('http://localhost:8080/product/add', {
        name: values.productname,
        imageURL: values.imageurl,
        price: values.price,
        description: values.description,
        categoryId: id,
      })
      .then((res) => {
        alert('product added successfully')
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <div className="container ">
        <div className="col-md-8 text-center mt-5 border border-2 border-primary rounded">
          <h1 className="pt-2">Add New Product</h1>

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
                    name="productname"
                    placeholder="Please enter category name"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="productname" />
                  </p>
                </div>
                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="imageurl"
                    placeholder="Please enter image URL"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="imageurl" />
                  </p>
                </div>

                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="number"
                    name="price"
                    placeholder="please enter category description"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="price" />
                  </p>
                </div>

                <div className="col-md-12 mt-4 px-3 pt-1">
                  <Field
                    type="text"
                    name="description"
                    placeholder="please enter category description"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="description" />
                  </p>
                </div>

                <button className="btn btn-primary mx-5 mb-1" type="submit">
                  Add Product
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

export default CreateProducts
