import React,{useState} from 'react'
import { Button, Card, Flex } from 'antd';
const { Meta } = Card;
import ProductDetails from './ProductDetails';
import { useDispatch } from 'react-redux';
import CardItems from './CardItems';
import { addToCart } from '../redux/actions/catProductAction';





const Product = ({productData=[], selectedCategory}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    console.log(productData, selectedCategory)
    
    const dispatch =  useDispatch();

    const handleClick = (data) => {
        setSelectedProduct(data);
        setShowDetail(true);
        dispatch(addToCart(data));
    };

    const filteredProducts = productData.filter(product => product.category === selectedCategory);
    const productsToDisplay = selectedCategory ? filteredProducts : productData;

  return (
    <>
    {showDetail ? (
                <ProductDetails
                    productId={selectedProduct.id}
                    onClose={() => setShowDetail(false)}
                />
            ) : (
                <Flex gap="large" justify='center' wrap='wrap'>
                    {productsToDisplay?.map((data) => (
                       <CardItems data={data} handleClick={handleClick}/>
                    ))}
                </Flex>
            )}
        
          
    </>
       
    
   
    );
  
}

export default Product