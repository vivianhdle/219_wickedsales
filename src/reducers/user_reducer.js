const DEFAULT_STATE={
    auth:false,
    username:'',
}

// exampleAction = {
//     type:'LOG_USER_IN', //could be any type of string or variable
//     username:'JimBob'
// }

//type property will tell Redux what to update in the state
//takes in a default state

function userReducer(state = DEFAULT_STATE,action){//action is an object
    switch(action.type){
        case 'SIGN_IN':
            return {...state, auth:true, username:action.username};
        default:
            return state;
    }
}

export default userReducer;