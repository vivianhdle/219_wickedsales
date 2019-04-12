import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Modal from '../modal'

class ProductAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            qty:1,
            modalOpen:false,
            totalPrice:0,
            cartQty:0
        }
        this.addToCart=this.addToCart.bind(this);
    }
    addToCart(){
        const {productId,updateCart}=this.props
        const {qty} = this.state
        axios.get(`/api/addcartitem.php?product_id=${productId}&quantity=${qty}`).then((resp)=>{
            // console.log('Add Cart Resp');
            const {cartCount,cartTotal}=resp.data;
            // this.props.history.push('/cart');
            updateCart(cartCount);
            this.setState({
                'modalOpen':true,
                'cartQty':cartCount,
                'totalPrice':cartTotal
            })
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
        const {modalOpen,cartQty,totalPrice,qty} = this.state;

        console.log(this.props);
        return(
            <div className="right-align add-to-cart">
                <span className="qty-container">
                    <button className="btn btn-floating green lighten-3 btn-small" onClick={this.decrementQty}><i className="material-icons">remove</i></button>
                    <span className="product-qty">{this.state.qty}</span>
                    <button className="btn btn-floating green lighten-3 btn-small" onClick={this.incrementQty}><i className="material-icons">add</i></button>
                </span>
                <button className="green lighten-3 btn" onClick={this.addToCart}><i className="material-icons">add_shopping_cart</i></button>
                <Modal isOpen={modalOpen}>
                    <h1 className="center">{qty} item(s) Added to Cart</h1>
                    <div className="row">
                        <div className="col s6">Cart Total Items</div>
                        <div className="col s6">{cartQty}</div>
                    </div>
                    <div className="row">
                        <div className="col s6">Cart Total Price</div>
                        <div className="col s6">{totalPrice}</div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default withRouter(ProductAdd);