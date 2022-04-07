import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function CategoryList() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8080/category/list')
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
      Category:
      {data.map((info) => (
        <div>
          <p>{info.id}</p>
          <img src={info.imageUrl} alt="category"></img>
          <h1>{info.categoryName}</h1>
          <p>{info.description}</p>
          <Link to={{ pathname: 'category/product/' + info.id }}>
            <button>Show Product in this category</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoryList
