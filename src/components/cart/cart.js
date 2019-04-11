import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {formatMoney} from '../../helpers';
import './cart.scss';

class Cart extends Component{
    state = {
        items:[],
        meta:{}
    }
    componentDidMount(){
        this.getCartData();
    }
    async getCartData(){
        const {data} = await axios.get('/api/getcartitems.php');
        console.log(data);
        if(data.success){
            this.setState({
                items:data.cartItems,
                meta:data.cartMetaData
            })
        }else {
            console.error('Cart data failed to load');
        }
    }
    render(){
        console.log(this.state);
        const {items,meta} = this.state;
        let totalItems=0;
        const cartItems=items.map(({name,price,images,quantity,id})=>{
            totalItems+=quantity
            const itemTotalPrice= formatMoney(quantity*price);
            return(
                <tr key={id}>
                    <td>
                        <img src={`/dist/${images}`} alt={`${name} product image`}/>
                    </td>
                    <td>{name}</td>
                    <td>{formatMoney(price)}</td>
                    <td>{quantity}</td>
                    <td>{itemTotalPrice}</td>
                </tr>
            )
        });
        return (
            <div className="cart">
                <h1 className="center">Shopping Cart</h1>
                <Link to="/products">Continue shopping</Link>
                <div className="right-align total-items">Total Items In Cart: {totalItems}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems}
                        <tr>
                            <td colSpan="5" className="total-price">
                            Total:{formatMoney(meta.total)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Cart;