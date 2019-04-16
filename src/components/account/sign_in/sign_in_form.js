import React from 'react';
import {reduxForm,Field} from 'redux-form';
import Input from '../../general/input';


const SignInForm = props =>{
    console.log('sign in props',props);
    const {handleSubmit,signIn}=props;
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


export default reduxForm({
    form:'sign-in-form'
})(SignInForm);