import types from './types';
import axios from 'axios';

//THESE functions have to return an object with a type property
//an async await will always return a promise
//middleware used to intercept promises
//dispatch will send the action back into the action creator

export function signIn(user){//will receive an object of user info
    return function(dispatch){
        axios.get('/api/sign_in.php').then(resp=>{
            console.log('sign in resp:', resp)
            if (resp.data.succes){
                    dispatch({
                    type:types.SIGN_IN
                })
            }else {
                dispatch({
                    type:types.SIGN_IN_ERROR
                })
            }
            
        })
    }
    // console.log('Sign In Action Creator, user data: ',user);
    // const resp = await axios.get('/api/sign-in.php')
    // console.log('Sign In Resp:', resp);
    // return{
    //     type:types.SIGN_IN,must have this, what is the action type? WILL HAVE TO MATCH WITH SOMETHING
    //     email:user.email
    // }
}

export function signOut(user){
    return{
        type:types.SIGN_OUT
    }
}


export function getAllProducts(){
    return function(dispatch){
        axios.get('/api/getproducts.php').then(resp =>{
            dispatch({
                type:types.GET_ALL_PRODUCTS,
                products:resp.data.products
            })
        })
    }
}