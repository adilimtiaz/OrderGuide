import { FETCH_PRODUCTS } from '../actions/types';

const initState = {
    products: []
};

export default function(state = initState, action){
    switch(action.type) {
        case FETCH_PRODUCTS:
            console.log(action.payload);
            return {
                ...state,
                products: action.payload
            };
        default:
            console.log("DEFAULT");
            return state;
    }
}
