
export function signIn(user){
    console.log('Sign In Action Creator, user data: ',user);

    return{
        type:'SIGN_IN' //must have this, what is the action type?
    }
}