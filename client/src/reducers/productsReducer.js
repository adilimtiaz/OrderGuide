import { FETCH_PRODUCTS } from '../actions/types';

export default function(state = [], action){
    switch(action.type) {
        case FETCH_PRODUCTS:
            console.log(action.payload);
            return action.payload;
        default:
            console.log("DEFAULT");
            return state;
    }
}
