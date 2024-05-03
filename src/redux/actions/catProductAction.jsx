import * as type from "../type";

 

// export const incrementCartAction = (payload) =>({
//     type:type.ADD_TO_CART,
//     payload
    
// })

export function initialCount(initialValue) {
      return {
        type: type.INITIAL_COUNT,
        initialValue,
      };
    }


export const addToCart = (product) => ({
  type: type.ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: type.REMOVE_FROM_CART,
  payload: productId
});

export const decreaseCartItem = (productId) => ({
  type: type.DECREASE_CART,
  payload: productId
});

export const increaseCartItem = (productId) => ({
  type: type.INCREASE_CART,
  payload: productId
});