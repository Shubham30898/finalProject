import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CartList() {
  const [data, setData] = useState([])
  const [totalamount, setTotalAmount] = useState([])
  useEffect(() => {
    axios
      .get(
        'http://localhost:8080/cart/?token=814f6289-d38a-4867-8cac-f1700df85457',
      )
      .then((res) => {
        setData(res.data.cartItems)
        setTotalAmount(res.data)
      })
      .catch((error) => {
        console.log(error)
        alert('something went wrong')
      })
  }, [])

  console.log(data)
  console.log(totalamount.totalCost)
  const navigate = useNavigate()
  return (
    <div>
      CartList:
      {/* {data.cartItems.map((info) => {
        return (
          <div>
            <p>{info.id}</p>

            <p> Qunatity is: {info.quantity}</p>
            {info.product.map((sub) => {
              return (
                <div>
                  <p>sub.name</p>
                  <img src={sub.imageURL} alt="product"></img>
                  <p>{sub.price}</p>
                </div>
              )
            })}
          </div>
        )
      })}
      <p>Total Amount: {data.totalCost}</p> */}
      <div>
        {data.map((info) => (
          <div>
            <p>{info.product.name}</p>
            <img src={info.product.imageURL} alt="product"></img>
            <p>Description:{info.product.description}</p>
            <p>Qunatity:{info.quantity}</p>
            <p>Price:{info.product.price}</p>
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
