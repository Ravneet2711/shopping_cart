
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BASE_URL } from './constants/constant';
import Categories from './components/Categories';
import Product from './components/Product';
import { Routes, Route,useLocation } from "react-router-dom";
import { Spin } from 'antd';
import LoginForm from './components/LoginForm';
import ProductDetails from './components/ProductDetails';
import Search from './components/Search';



const App = () => {
  const [data, setData] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [productData, setProductData] = useState(null);
  const [catData, setCatData]= useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [loading, setLoading] =  useState(false)
  const [searchFilter, setSearchFilter] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setLoading(true)
    axios.get(`${BASE_URL}/products/categories`)
      .then((res) => {
        setData(res.data);
        
      })
      .catch((error) => {
        console.error(error);
        
      });

      setLoading(true)
    axios.get(`${BASE_URL}/products`)
      .then((res) => {
        setProductData(res.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false)
      });
  }, []);

  const fetchProducts = (cat) => {
    setSelectedCategory(cat);
    setLoading(true)
    axios.get(`${BASE_URL}/products/category/${cat}`)
      .then((res) => {
        setCatData(res.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products by category:', error);
        setLoading(false)
      });
  }

  const handleSearch = (value) => {
    const filteredProducts = productData.filter(product => product.title.toLowerCase().includes(value.toLowerCase()));
   setSearchFilter(filteredProducts)
  //  navigate("/search")
  }

  return (
    <>
      <div>
        <Categories data={data} fetchProducts={fetchProducts}    showLoginForm={showLoginForm} />

        {!location.pathname.startsWith('/login') && (
          <Search onSearch={handleSearch} searchFilter={searchFilter} />
        )}
        {/* <Search onSearch={handleSearch} searchFilter={searchFilter}/> */}
      </div>
      {loading ? <div style={{textAlign: "center",
                    margin: "200px auto",
                    display: "block"
                }}> <Spin size="large"/> </div>
                :
      <Routes>
          {/* / home page  =============>product list*/} 
          <Route path={'/'} element={productData && !showLoginForm && <Product productData={productData} />}
          />

          {/* /category/category-name */}
          <Route path={`/category/${selectedCategory}`} element={productData && <Product productData={productData} selectedCategory={selectedCategory}/>} />

          {/* /product====> ==============>product list */}
          <Route path={'/products'} element={
            productData &&  <Product productData={productData} searchFilter={searchFilter}/>}
         />
          
          {/* /product/id ==>product details*/}
          <Route path="/products/:id" element={<ProductDetails/>} />
          
          {/* /login ==============>if login then not open this url*/}
          <Route path="/login" element={<LoginForm/>} />

        
      </Routes>
}

    </>
  )
}

export default App;
