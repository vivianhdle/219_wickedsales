import React, {Component} from 'react';
import axios from 'axios';

class Test extends Component{
    state={
        message: 'Checking auth...'
    }
    componentDidMount(){
        this.checkAuth();
    }
    async checkAuth(){
        const resp = await axios.get('/api/test/check_auth.php');
        console.log('Check Auth: ',resp.data);
        this.setState({
            message:resp.data.auth ? 'You are signed in' : 'Please sign in'
        })
    }
    signIn = async () =>{
        const resp = await axios.get('/api/test/sign_in.php');
        console.log('Sign In Resp: ',resp);
        this.checkAuth();
    }
    signOut = async () =>{
        const resp = await axios.get('/api/test/sign_out.php');
        this.checkAuth();
    }
    render(){
        return (
            <div>
                <h1 className="center">Test Stuff</h1>
                <h2 className="center">{this.state.message}</h2>
                <div className="center">
                    <button className="btn-large btn" onClick={this.signIn}>Sign In</button>
                    <button className="btn-large btn red" onClick={this.signOut}>Sign Out</button>
                </div>
            </div>
        )
    }
}

export default Test;