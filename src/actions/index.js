import types from './types';

export function signIn(user){//will receive an object of user info
    console.log('Sign In Action Creator, user data: ',user);

    return{
        type:types.SIGN_IN,//must have this, what is the action type? WILL HAVE TO MATCH WITH SOMETHING
        email:user.email
    }
}

export function signOut(user){
    return{
        type:types.SIGN_OUT
    }
}