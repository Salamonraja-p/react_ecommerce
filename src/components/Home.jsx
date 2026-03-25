import React from 'react'
import useFetch from './custom-hook/useFetch'

const Home = () => {

  let { products } = useFetch(
    "https://raw.githubusercontent.com/Salamonraja-p/my-data/main/db.json"
  );

  return (
    <div>
      <h1> Home - Total Products = {products.length} </h1>
    </div>
  )
}

export default Home