import { FETCH_PRODUCTS, UPDATE_PRODUCT, UPDATE_SHOW_MODAL, UPDATE_SHOW_ADDPRODUCTS_MODAL } from '../actions/types';

const initState = {
    showModal: false,
    products: []
};

export default function(state = initState, action){
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case UPDATE_PRODUCT:
            // React rerenders state when it detects changes
            // A change in a property of the product prop does not trigger reload
            // Hence, this removes the orignal proudct and replaces it with the product
            // updated property. This tricks React into rerendering the state.
            let newProducts = state.products.filter(product =>
                product._id !== action.updatedProduct._id
            );
            return {
                ...state,
                products: [action.updatedProduct,...newProducts]
            };
        case UPDATE_SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload
            };
        case UPDATE_SHOW_ADDPRODUCTS_MODAL:
            return {
                ...state,
                showAddProductsModal: action.payload
            };
        default:
            return state;
    }
}
