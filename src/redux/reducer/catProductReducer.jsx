// reducers/categoryReducer.js
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
      return {
        ...state,
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + action.payload.price,
        cart: [...state.cart, action.payload],
      };
    case type.REMOVE_FROM_CART:
      return {
        ...state,
        totalQuantity: state.totalQuantity - 1,
        totalPrice: state.totalPrice - action.payload.price,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case type.DECREASE_CART:
      return {
        ...state,
        totalQuantity: state.totalQuantity - 1,
        totalPrice: state.totalPrice - action.payload.price,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0), 
      };
    case type.INCREASE_CART:
      return {
        ...state,
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + action.payload.price,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    default:
      return state;
  }
};


// export const addToCartReducer = (state= initialState, action)=>{
//     switch (action.type) {
//       case type.INITIAL_COUNT:
//         return {
//           ...state
//         };
//       case type.ADD_TO_CART:
//         return {
//           ...state,
//           totalQuantity:state.totalQuantity+1,
//           totalPrice:state.totalPrice + action.payload?.price ,
//           cart: [...state.cart, action.payload]
//         };
//       case type.REMOVE_FROM_CART:
//         return {
//           ...state,
//           cart: state.cart.filter(item => item.id !== action.payload)
//         };
//       case type.DECREASE_CART:
//         return {
//           ...state,
//           totalQuantity:state.totalQuantity-1,
//           totalPrice:state.totalPrice>0 ?state.totalPrice - action.payload?.price : 0 ,
//           cart: [...state.cart, action.payload]
//         }
//       case type.INCREASE_CART:
//         return {
//           ...state,
//           cart: state.cart.map(item =>
//             item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//           )
//         };
//       default:
//         return state;
//     }
  
//   }





