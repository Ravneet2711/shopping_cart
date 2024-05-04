import React from 'react'
import { Button, Card } from 'antd';
const { Meta } = Card;
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/catProductAction';



const CardItems = ({data,handleClick,setShowDetail}) => {
    const dispatch =  useDispatch();

    const cardHandler = () =>{
        setShowDetail(false)
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
    hoverable
    style={{
        width: "20%",
        margin: "20px",
        border: "1px solid #c0b2b2"
    }}
    onClick={() => handleClick(data)}
    cover={<img alt={data.title} src={data.image} style={{ margin: "0 auto", width: "250px", height: "250px",paddingTop:"10px" }} />}
>
    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
        <p style={{ fontWeight: "bold" }}> ${data.price}</p>
        <p style={{ fontWeight: "bold" }}> {data.category.slice(0,1).toUpperCase()+data.category.slice(1)}</p>
    </div>
    <Meta title={<h2 className='meta_heading'>{data.title}</h2>} description={<p className='meta_desc'>{truncateDescription(data.description)}</p>} />
    <Button className='cart_btn' type='primary' onClick={()=> cardHandler(data)}>Add to Cart</Button>
</Card>
  )
}

export default CardItems