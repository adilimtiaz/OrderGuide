import axios from 'axios';
import {FETCH_PRODUCTS} from "./types";

export const fetchProducts = () => async dispatch => {
    try {
        const allProducts = await axios.get('/api/products');
        console.log(allProducts);
        dispatch({type: FETCH_PRODUCTS, payload: allProducts});
    } catch( err ) {
        console.log(err);
    }
};
