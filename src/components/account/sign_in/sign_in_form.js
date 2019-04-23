import React from 'react';
import {reduxForm,Field} from 'redux-form';
import Input from '../../general/input';


const SignInForm = props =>{
    const {handleSubmit,signIn}=props
    return(
        <form onSubmit={handleSubmit(signIn)}>
            <div className="row">
                <Field id="email" col="s12" name="email" component={Input} label="Email"/>
            </div>
            <div className="row">
                <Field id="password" col="s12" name="password" component={Input} type="password" label="Password"/>
            </div>
                <button className="btn green lighten-2 right">Submit</button>
        </form>
    );
}


//for redux forms... form values is the NAME PROP
//can destructure in parameters
function validate(values){
    const {email,password} = values;
    const errors = {};
    if(!email){
        errors.email = 'Please enter your email'
    }
    if (!password){
        errors.password = 'Please enter your password'
    }
    return errors;
}



export default reduxForm({
    form:'sign-in-form',//doesnt reference this anywhere else
    validate: validate//validate function
})(SignInForm);//pass it the component