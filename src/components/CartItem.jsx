import React from 'react';
import { Avatar, List } from 'antd';
import { PlusSquareFilled, MinusSquareFilled, CloseOutlined } from '@ant-design/icons';
import { removeFromCart, decreaseCartItem, increaseCartItem } from "../redux/actions/catProductAction";
import { useDispatch, useSelector } from 'react-redux';

const CartItem = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.count.totalQuantity);
  const cart = useSelector(state => state.count.cart);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={item.title}
              description={<div>Price: <span>{item.price}</span></div>}
            />
            <PlusSquareFilled onClick={() => dispatch(increaseCartItem(item))} />
            <span>{totalQuantity}</span>
            <MinusSquareFilled onClick={() => dispatch(decreaseCartItem(item))} />
            <CloseOutlined onClick={() => dispatch(removeFromCart(item))} />
          </List.Item>
        )}
      />
      <div style={{ fontWeight: "bold" }}>Total: {totalPrice.toFixed(2)} </div>
    </>
  )
}

export default CartItem;