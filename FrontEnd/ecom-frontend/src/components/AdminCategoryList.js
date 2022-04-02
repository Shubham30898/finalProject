import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AdminCategoryList() {
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
  const navigate = useNavigate()
  return (
    <div>
      Category:
      {data.map((info) => (
        <div>
          <p>{info.id}</p>
          <img src={info.imageUrl} alt="category"></img>
          <h1>{info.categoryName}</h1>
          <p>{info.description}</p>
          <Link to={{ pathname: '/admin/category/updatecategory/' + info.id }}>
            <button>Update Category</button>
          </Link>
        </div>
      ))}
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default AdminCategoryList
