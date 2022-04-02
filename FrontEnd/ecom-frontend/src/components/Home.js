import React from 'react'
import CategoryList from './CategoryList'
import Navbar from './Navbar'
import ProductList from './ProductList'

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <CategoryList></CategoryList>
      <ProductList></ProductList>
    </div>
  )
}

export default Home
