import types from "../actions/types";

const DEFAULT_STATE={
    list:[]
}

// exampleAction = {
//     type:'LOG_USER_IN', //could be any type of string or variable
//     username:'JimBob'
// }

//type property will tell Redux what to update in the state
//takes in a default state

function productReducer(state = DEFAULT_STATE,action){//action is an object from src/actions so they are a 1:1
    switch(action.type){
        case types.GET_ALL_PRODUCTS:
            return {...state,list:action.products};
        default:
            return state;
    }
}

export default productReducer;