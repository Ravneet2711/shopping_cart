import { createStore } from "redux";
import { combineReducers, compose } from "redux";
import { addToCartReducer } from "./reducer/catProductReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    count:addToCartReducer
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(persistedReducer,composeEnhancer());

const persistor = persistStore(store);

export {store,persistor};