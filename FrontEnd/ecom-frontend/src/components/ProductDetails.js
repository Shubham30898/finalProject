import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id
  const [productname, setProductName] = useState('')
  const [imageurl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [quantity, setQunatity] = useState('')

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

  const handleQuantity = (e) => {
    setQunatity(e.target.value)
  }

  const handleApi = () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      axios
        .post(`http://localhost:8080/cart/add?token=${token}`, {
          productId: id,
          quantity: quantity,
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
      <input value={quantity} onChange={handleQuantity} type="number" />
      <br></br>
      <button onClick={handleApi}>Add to cart</button>
      <br></br>
      <button onClick={handleCart}>Show Cart</button>
      <br></br>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  )
}

export default ProductDetails
