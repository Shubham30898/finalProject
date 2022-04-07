import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CartList() {
  const [data, setData] = useState([])
  const [totalamount, setTotalAmount] = useState([])
  useEffect(() => {
    let token = sessionStorage.getItem('token')
    axios
      .get(`http://localhost:8080/cart/?token=${token}`)
      .then((res) => {
        setData(res.data.cartItems)
        setTotalAmount(res.data)
      })
      .catch((error) => {
        console.log(error)
        alert('something went wrong')
      })
  }, [])

  function deleteHandler(id) {
    let token = sessionStorage.getItem('token')
    axios.delete(`http://localhost:8080/cart/delete/${id}?token=${token}`)
    console.log(id)
    window.location.reload()
  }

  console.log(data)
  console.log(totalamount.totalCost)
  sessionStorage.setItem('total', `${totalamount.totalCost}`)
  const navigate = useNavigate()
  return (
    <div>
      CartList:
      <div>
        {data.map((info) => (
          <div>
            <p>{info.product.name}</p>
            <img src={info.product.imageURL} alt="product"></img>
            <p>Description:{info.product.description}</p>
            <p>Qunatity:{info.quantity}</p>
            <p>Price:{info.product.price}</p>
            <button onClick={() => deleteHandler(info.id)}>Delete item</button>
          </div>
        ))}
      </div>
      <p>Total Amount :{totalamount.totalCost}</p>
      <br />
      <button onClick={() => navigate('/address')}>Add Address</button>
    </div>
  )
}

export default CartList
