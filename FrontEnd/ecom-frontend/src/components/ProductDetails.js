import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment } from 'react/cjs/react.production.min'
import * as yup from 'yup'

function ProductDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id
  const [productname, setProductName] = useState('')
  const [imageurl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')

  console.log({ productname, imageurl, price, description })

  useEffect(() => {
    getProductDetails()
  }, [])

  const getProductDetails = async () => {
    console.log(id)
    let result = await fetch(`http://localhost:8080/product/product/${id}`)
    result = await result.json()
    console.warn(result)

    setProductName(result[0].name)
    setImageUrl(result[0].imageURL)
    setPrice(result[0].price)
    setDescription(result[0].description)
    setCategoryId(result[0].categoryId)
  }

  const defaultValue = {
    quantity: '',
  }

  const validationSchema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please Enter Quantity')
      .test(
        'Is positive?',
        'ERROR: The quantity must be greater than 0!',
        (value) => value > 0,
      ),
  })

  const handleOnSubmit = (values) => {
    console.log('values', values)
    const token = sessionStorage.getItem('token')
    if (token) {
      axios
        .post(`http://localhost:8080/cart/add?token=${token}`, {
          productId: id,
          quantity: values.quantity,
        })
        .then((res) => {
          alert(res.data.message)
          console.log(res.data.message)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('Log in first')
    }
  }

  const handleCart = () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      navigate('/cart')
    } else {
      alert('Log in First')
    }
  }

  return (
    <>
      <div>ProductDetails</div>
      <h1>{productname}</h1>
      <img src={imageurl} alt="product details"></img>
      <p>{description}</p>
      <p>{price}</p>
      <br></br>
      quantity:
      <Fragment>
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form>
            <div>
              <Field
                type="number"
                name="quantity"
                placeholder="Enter Quntity"
              />
              <p className="text-danger">
                <ErrorMessage name="quantity" />
              </p>
            </div>
            <button className="btn btn-primary mx-5 mb-1" type="submit">
              Add to cart
            </button>
          </Form>
        </Formik>
      </Fragment>
      <br></br>
      <button onClick={handleCart}>Show Cart</button>
      <br></br>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  )
}

export default ProductDetails
