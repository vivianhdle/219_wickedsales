// const state = {
//     user:{
//         auth:false,
//         username:'Steve'
//     },
//     products:{
//         list:[],
//         productDetails:{}
//     }
//     cart:{
//         totalItems:4,
//         totalCost:8900,
//         items:[]
//     }
// }

import {combineReducers} from 'redux';
//builds what your initial state is (combining all the default states)
import userReducer from './user_reducer'
import {reducer as formReducer} from 'redux-form';
import productsReducer from './products_reducer';

const rootReducer = combineReducers({
    form:formReducer,
    products:productsReducer,
    user:userReducer
});
//rootReducer keys must match (key form must stay the same)

//the map of what the combineReducers is doing
// const state = {
//     form:{},
//     user:{
//         auth:false,
//         username:''
//     }
// }

export default rootReducer