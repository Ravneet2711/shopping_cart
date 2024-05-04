import * as type from "../type";

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

export const removeFromCart = (product) => ({
  type: type.REMOVE_FROM_CART,
  payload:product
});

export const decreaseCartItem = (product) => ({
  type: type.DECREASE_CART,
  payload: product
});

export const increaseCartItem = (productId) => ({
  type: type.INCREASE_CART,
  payload: productId
});