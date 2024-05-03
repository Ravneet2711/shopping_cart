import { createStore } from "redux";
import { combineReducers, compose } from "redux";
import { addToCartReducer } from "./reducer/catProductReducer";

const rootReducer = combineReducers({
   
    count:addToCartReducer
})

const composeEnhancer = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer,composeEnhancer());
export default store