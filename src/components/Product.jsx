import React,{useState} from 'react'
import {  Flex } from 'antd';
import ProductDetails from './ProductDetails';
import CardItems from './CardItems';

const Product = ({productData=[], selectedCategory,searchFilter=[]}) => {

    console.log(searchFilter)

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
     
    const handleClick = (data) => {
        setSelectedProduct(data);
        setShowDetail(true)
    };


    const productsToDisplay = Array.isArray(searchFilter) && searchFilter.length > 0
    ? searchFilter
    : selectedCategory
        ? productData.filter(product => product.category === selectedCategory)
        : productData;


  return (
    <>
    {showDetail ? (
        <ProductDetails
            productId={selectedProduct.id}
            onClose={() => setShowDetail(false)}
        />
    ) : (
        <Flex wrap='wrap' justify='center'>
            {productsToDisplay?.map((data) => (
                <CardItems  key={data.id} data={data} handleClick={handleClick} setShowDetail={setShowDetail}/>
            ))}
        </Flex>
    )}
        
          
    </>    
   
    );
  
}

export default Product