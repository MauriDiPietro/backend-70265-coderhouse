import { useState, useEffect } from 'react'
import './App.css'

function App() {

  // const products = []

  const [products, setProducts] = useState([])

  useEffect(()=>{
    const fetchProducts = async() =>{
      try {
        const response = await fetch('http://localhost:8080/products');
        const respJson = await response.json();
        console.log(respJson);
        setProducts(respJson)
      } catch (error) {
        alert(error)
      }
    }
    fetchProducts();
  }, [])

  return (
    <>
     {
      products.map((prod)=>{
        return (
          <p>{prod.name} - ${prod.price}</p>
        )
      })
     }
    </>
  )
}

export default App
