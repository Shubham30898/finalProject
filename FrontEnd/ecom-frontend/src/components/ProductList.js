import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

function ProductList() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
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
      <div>
        <span>
          <input
            type="text"
            placeholder="Search Product"
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
          />
        </span>
      </div>
      <Row xs={1} md={4} className="g-4">
        {data
          .filter((info) => {
            if (searchTerm == '') {
              return info
            } else if (
              info.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            ) {
              return info
            }
          })
          .map((info) => (
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={info.imageURL} />
                <Card.Body>
                  <Card.Title>Name: {info.name}</Card.Title>
                  <Card.Text>
                    <p>Id: {info.id}</p>
                    <p>Description: {info.description}</p>
                    <p>Price: {info.price}</p>
                  </Card.Text>
                  {sessionStorage.getItem('token') ? (
                    <Link
                      to={{ pathname: '/product/productdetails/' + info.id }}
                    >
                      <Button variant="primary">View Details</Button>
                    </Link>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default ProductList
