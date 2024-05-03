
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BASE_URL, AUTH_TOKEN } from './constants/constant';
import Categories from './components/Categories';
import Product from './components/Product';
import { Routes, Route } from "react-router-dom";

import LoginForm from './components/LoginForm';
import ModalLayout from './components/Modal';
import ProductDetails from './components/ProductDetails';


const App = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [productData, setProductData] = useState(null);
  const [catData, setCatData]= useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    axios.get(`${BASE_URL}/products/categories`)
      .then((res) => {
        setData(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(`${BASE_URL}/products`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const fetchProducts = (cat) => {
    setSelectedCategory(cat);
    axios.get(`${BASE_URL}/products/category/${cat}`)
      .then((res) => {
        setCatData(res.data);
        
      })
      .catch((error) => {
        console.error('Error fetching products by category:', error);
      });
  }

  

  const handleLogin = () => {
    setToken(AUTH_TOKEN);
    localStorage.setItem('token', token);
    setShowLoginForm(true);
  }

  const handleLogOut = () => {
    setToken(null);
    localStorage.removeItem(token);
    setShowLoginForm(false);
  }

  return (
    <>
      <div>
        <Categories data={data} fetchProducts={fetchProducts} handleLogin={handleLogin} handleLogOut={handleLogOut} token={token} showLoginForm={showLoginForm} />
        <ModalLayout/>
      </div>
      <Routes>
          {/* / home page  =============>product list*/} 
          <Route path={'/'} element={<div className='product-container'>
            {productData && !showLoginForm && <Product productData={productData} />}
          </div>}/>

          {/* /category/category-name */}
          <Route path={`/category/${selectedCategory}`} element={productData && <Product productData={productData} selectedCategory={selectedCategory}/>} />

          {/* /product====> ==============>product list */}
          <Route path={'/products'} element={<div className='product-container'>
            {productData &&  <Product productData={productData} />}
          </div>}/>
          
          {/* /product/id ==>product details*/}
          <Route path="/products/:id" element={<ProductDetails/>} />
          
          {/* /login ==============>if login then not open this url*/}
          <Route path="/login" element={<LoginForm/>} />


        
        
        

        {/* <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={showLoginForm ? <LoginForm /> : (
          <div className='product-container'>
            {productData && !showLoginForm && <Product productData={productData} />}
          </div>
        )} />
        <Route path="/products" element={showLoginForm ? <LoginForm /> : (
          <div className='product-container'>
            {productData && !showLoginForm && <Product productData={productData} />}
          </div>
        )}  />
        <Route path="/products/categories" element={<Categories data={data} fetchProducts={fetchProducts} handleLogin={handleLogin} handleLogOut={handleLogOut} token={token} showLoginForm={showLoginForm} />} />
        <Route path="/login" element={<LoginForm/>} /> */}
        
      </Routes>


    </>
  )
}

export default App;
