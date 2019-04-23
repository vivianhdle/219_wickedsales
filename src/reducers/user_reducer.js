import types from "../actions/types";

const DEFAULT_STATE={
    auth:false,
    email:'',
}

// exampleAction = {
//     type:'LOG_USER_IN', //could be any type of string or variable
//     username:'JimBob'
// }

//type property will tell Redux what to update in the state
//takes in a default state

function userReducer(state = DEFAULT_STATE,action){//action is an object from src/actions so they are a 1:1
    switch(action.type){
        case types.SIGN_IN:
            return {...state, auth:true, email:action.email};
        case types.SIGN_OUT:
            return {...DEFAULT_STATE};
        default:
            return state;
    }
}

export default userReducer;