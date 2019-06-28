import axios from 'axios';
import { FETCH_PRODUCTS, UPDATE_PRODUCT, UPDATE_SHOW_MODAL, UPDATE_SHOW_ADDPRODUCTS_MODAL } from "./types";

export const fetchProducts = () => async dispatch => {
    try {
        const allProducts = await axios.get('/api/products');
        dispatch({type: FETCH_PRODUCTS, payload: allProducts.data});
    } catch( err ) {
        console.log(err);
    }
};

export const updateProduct = product => async dispatch => {
    try {
        const res = await axios.put('/api/products',{
            product: product
        });

        dispatch({
            type: UPDATE_PRODUCT,
            updatedProduct: res.data
        });
    } catch( err ) {
        console.log(err);
    }
};

export const updateShowModal = showModal => {
    return {
        type: UPDATE_SHOW_MODAL,
        payload: showModal
    }
};

export const updateShowAddProductsModal = showAddProductsModal => {
    return {
        type: UPDATE_SHOW_ADDPRODUCTS_MODAL,
        payload: showAddProductsModal
    }
};
