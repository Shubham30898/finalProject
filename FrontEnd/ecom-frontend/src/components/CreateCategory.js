import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment } from 'react/cjs/react.production.min'
import * as yup from 'yup'

function CreateCategory() {
  const navigate = useNavigate()

  const defaultValue = {
    categoryname: '',
    imageurl: '',
    description: '',
  }

  const validationSchema = yup.object().shape({
    categoryname: yup.string().required('Please enter category name'),
    imageurl: yup.string().required('Please enter image URL'),
    description: yup.string().required('please enter category description'),
  })

  const handleSubmit = (values) => {
    console.log('values', values)
    axios
      .post('http://localhost:8080/category/create', {
        categoryName: values.categoryname,
        imageUrl: values.imageurl,
        description: values.description,
      })
      .then((result) => {
        console.log(result.data)
        alert('New Category Created')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <div className="container ">
        <div className="col-md-8 text-center mt-5 border border-2 border-primary rounded">
          <h1 className="pt-2">Add New Category</h1>

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
                    name="categoryname"
                    placeholder="Please enter category name"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="categoryname" />
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
                  Add Category
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

export default CreateCategory
