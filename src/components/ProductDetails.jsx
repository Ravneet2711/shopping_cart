import { Button,Card,Spin} from 'antd';
const { Meta } = Card;
import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/catProductAction';
import { BASE_URL } from '../constants/constant';
import axios from 'axios';


const ProductDetails = ({productId}) => {
    const [product, setProduct] = useState(null);
    const dispatch =  useDispatch();


    useEffect(() => {
      axios.get(`${BASE_URL}/products/${productId}`)
        .then((res) => {
          setProduct(res.data);
          console.log(res.data)
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
        });
  },[]); 

  if (!product) {
      return <div style={{textAlign: "center",
                  margin: "200px auto",
                  display: "block"
              }}> <Spin size="large"/> </div>; 
  }
    

  return (
    <>
        <Card
            bordered={false}
            style={{
            width: "50%",
            margin:"30px auto",
            paddingTop:"10px",
            border:"1px solid #c0b2b2 "
            }}
            cover={
            <img
                alt={product.title}
                src={product.image}
                style={{
                    width:"30%",
                    margin:"0 auto"
                }}
            />
            }
            actions={[
                <Button onClick={()=> dispatch(addToCart(product))}>Add To Cart</Button>
            ]}
        >
            <Meta
                title={product.title}
                description={product.description}
            />
        </Card>
    </>
    
  )
}

export default ProductDetails