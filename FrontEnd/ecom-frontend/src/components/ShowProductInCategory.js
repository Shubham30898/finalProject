import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ShowProductInCategory() {
  const params = useParams()
  const id = params.id
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8080/product/')
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
        alert('something went wrong')
      })
  }, [])

  return (
    <div>
      Products:
      {data
        .filter((info) => {
          if (info.categoryId == id) {
            return info
          } else {
            return 0
          }
        })
        .map((info) => (
          <div>
            <p>{info.id}</p>
            <img src={info.imageURL} alt="category"></img>
            <h1>{info.name}</h1>
            <p>{info.description.substring(1, 50)}</p>
            <p>{info.price}</p>
            <Link to={{ pathname: '/product/productdetails/' + info.id }}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default ShowProductInCategory
