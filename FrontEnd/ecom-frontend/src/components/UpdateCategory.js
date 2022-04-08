import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment } from 'react/cjs/react.production.min'
import * as yup from 'yup'

function UpdateCategory() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const [categoryname, setCategoryName] = useState('')
  const [imageurl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')

  console.log({ categoryname, imageurl, description })

  useEffect(() => {
    getCategoryDetails()
  })

  const getCategoryDetails = async () => {
    console.log(id)
    let result = await fetch(`http://localhost:8080/category/getcategory/${id}`)
    result = await result.json()
    console.warn(result)

    setCategoryName(result.categoryName)
    setImageUrl(result.imageUrl)
    setDescription(result.description)
  }

  // const handleCategoryName = (e) => {
  //   setCategoryName(e.target.value)
  // }
  // const handleImageUrl = (e) => {
  //   setImageUrl(e.target.value)
  // }
  // const handleDescription = (e) => {
  //   setDescription(e.target.value)
  // }

  const defaultValue = {
    categoryname: categoryname,
    imageURL: imageurl,
    description: description,
  }

  const validationSchema = yup.object().shape({
    categoryname: yup.string().required('Please Update Product'),
    imageURL: yup.string().required('Please Update Image'),
    description: yup.string().required('please update product description'),
  })

  const handleSubmit = (values) => {
    console.log('values', values)
    axios
      .post(`http://localhost:8080/category/update/${id}`, {
        categoryName: values.categoryname,
        imageUrl: values.imageURL,
        description: values.description,
      })
      .then((result) => {
        console.log(result.data)
        alert(result.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <div className="container ">
        <div className="col-md-8 text-center mt-5 border border-2 border-primary rounded">
          <h1 className="pt-2">Update Category</h1>

          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            enableReinitialize
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
                    name="imageURL"
                    placeholder="Please enter image URL"
                    className="form-control border border-1 border-dark"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="imageURL" />
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
                  Update
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

export default UpdateCategory
