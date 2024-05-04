

import * as type from '../type';

const initialState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0
};

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.INITIAL_COUNT:
      return {
        ...state,
        totalQuantity: 0,
        totalPrice: 0,
        cart: [],
      };
 
      case type.ADD_TO_CART:
        const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
        console.log("Existing Item Index:", existingItemIndex);

        if (existingItemIndex !== -1) {
          const updatedCart = [...state.cart];
          updatedCart[existingItemIndex].quantity += 1;
          console.log("Updated Cart:", updatedCart);
          return {
            ...state,
            totalQuantity: state.totalQuantity + 1,
            totalPrice: state.totalPrice + action.payload.price,
            cart: updatedCart,
          };
        } else {
          // If item doesn't exist, add it to cart with quantity initialized to 1
          console.log("Adding new item to cart.");
          return {
            ...state,
            totalQuantity: state.totalQuantity + 1,
            totalPrice: state.totalPrice + action.payload.price,
            cart: [...state.cart, { ...action.payload, quantity: 1 }], // Initialize quantity to 1
          };
        }

      case type.INCREASE_CART:
      const { id } = action.payload; 
      console.log(id)
      const updatedCartIncremented = state.cart.map(item =>
        item.id === id ? { ...item, quantity: (item.quantity) + 1 } : item
      );
      console.log(updatedCartIncremented)
      return {
        ...state,
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + (action.payload.price), // Increment total price by item's price
        cart: updatedCartIncremented,
      };

      case type.DECREASE_CART:
        const updatedCartDecreased = state.cart.map(item => {
          if (item.id === action.payload.id && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }; 
          }
          return item;
        });
      
        return {
          ...state,
          totalQuantity: state.totalQuantity - 1,
          totalPrice: state.totalPrice - action.payload.price, // Decrement total price by item's price
          cart: updatedCartDecreased,
        };

      case type.REMOVE_FROM_CART:
      const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      console.log(updatedCart)
      const updatedTotalQuantity = state.totalQuantity - action.payload.quantity;
      const updatedTotalPrice = state.totalPrice - (action.payload.price * action.payload.quantity);
  
      return {
        ...state,
        totalQuantity: updatedTotalQuantity,
        totalPrice: updatedTotalPrice,
        cart: updatedCart,
      };
  
      
    default:
      return state;
  }
};








