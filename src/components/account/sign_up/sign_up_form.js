import React from 'react';
import {reduxForm,Field} from 'redux-form';
import Input from '../../general/input';

const SignUpForm = props => {
    const {signUp,handleSubmit}=props
    return(
        <form onSubmit={handleSubmit(signUp)}>
            <div className="row">
                <Field id="fullname" name="fullname" component={Input} col="s12 m6" label="Full Name"/>
                <Field id="email" name="email" component={Input} col="s12 m6" label="Email"/>
            </div>
            <div className="row">
                <Field id="password" name="password" component={Input} col="s12 m6" label="Password" type="password"/>
                <Field id="confirm" name="confirm" component={Input} col="s12 m6" label="Confirm Password" type="password"/>
            </div>
            <button className="btn green lighten-2 right">Submit</button>
        </form>
    )
}

function validate(values){
    const {email,password,confirm,fullname} = values
    const errors = {};
    if(!fullname){
        errors.email = 'Please enter your full name';
    }
    if(!email){
        errors.email = 'Please enter your email';
    }
    if (!password){
        errors.password = 'Please enter a password';
    }
    if(!confirm){
        errors.password = 'Please confirm your password';
    }
    if(password!==confirm){
        errors.confirm = 'Passwords do not match';
    }
    return errors;
}


export default reduxForm({
    form:'sign-up-form',
    validate:validate
})(SignUpForm);