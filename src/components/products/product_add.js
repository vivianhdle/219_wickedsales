import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ProductAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            qty:1
        }
        this.addToCart=this.addToCart.bind(this);
    }
    addToCart(){
        const {productId}=this.props
        const {qty} = this.state
        axios.get(`/api/addcartitem.php?product_id=${productId}&quantity=${qty}`).then((resp)=>{
            this.props.history.push('/cart');
        })
    }
    incrementQty =()=>{
        this.setState({
            qty:this.state.qty +1
        })
    }
    decrementQty =()=>{
        if (this.state.qty>1){
            this.setState({
                qty:this.state.qty - 1
            })
        }
    }
    render(){
        console.log(this.props);
        return(
            <div className="right-align add-to-cart">
                <span className="qty-container">
                    <button className="btn btn-floating green lighten-3 btn-small" onClick={this.decrementQty}><i className="material-icons">remove</i></button>
                    <span className="product-qty">{this.state.qty}</span>
                    <button className="btn btn-floating green lighten-3 btn-small" onClick={this.incrementQty}><i className="material-icons">add</i></button>
                </span>
                <button className="green lighten-3 btn" onClick={this.addToCart}><i className="material-icons">add_shopping_cart</i></button>
            </div>
        )
    }
}
export default withRouter(ProductAdd);