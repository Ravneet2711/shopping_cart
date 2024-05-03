import React from 'react'
import { Button, Card } from 'antd';
const { Meta } = Card;
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/catProductAction';



const CardItems = ({data,handleClick}) => {
    const dispatch = useDispatch();
    const cartList = useSelector(state=> state.count.cart)

    console.log(cartList)
    // const 
    const cardHandler = () =>{
        dispatch(addToCart(data))
    }

    const truncateDescription =(description)=>{
        let words = description.split(' ').slice(0 , 10).join(' ');
        if(words.length > 10) {
            return words+="..."
        }
    }
  return (
    <Card
    key={data.id}
    hoverable
    style={{
        width: "25%",
        margin: "20px",
        border: "1px solid #c0b2b2"
    }}
    onClick={() => handleClick(data)}
    cover={<img alt={data.title} src={data.image} style={{ margin: "0 auto", width: "250px", height: "250px" }} />}
>
    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
        <p><span style={{ fontWeight: "bold" }}>Price:</span> {data.price}</p>
        <p><span style={{ fontWeight: "bold" }}>Category:</span> {data.category}</p>
    </div>
    <Meta title={<h2 className='meta_heading'>{data.title}</h2>} description={<p className='meta_desc'>{truncateDescription(data.description)}</p>} />
    <Button className='cart_btn' type='primary' onClick={() => cardHandler()}>Add to Cart</Button>
</Card>
  )
}

export default CardItems