import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

class Cart extends Component{
    state = {

    }
    getCartData = async ( ) => {
        // const resp = axios.get('/api/getcartitems')
    }
    render(){
        return (
            <div>
                <h1 className="center">Shopping Cart</h1>
                <Link to="/products">Continue shopping</Link>
            </div>
        )
    }
}

export default Cart;