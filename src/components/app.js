import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
import '../assets/css/app.scss';
import React,{Component} from 'react';
import ProductRoutes from './products';
import {Route, Switch} from 'react-router-dom';
import Home from './home';
import Nav from './nav';
import NotFound from './404'
import Cart from './cart';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            cartItems:0
        }
        this.updateCartItems=this.updateCartItems.bind(this);
    }
    updateCartItems(count){
        this.setState({
            cartItems:count
        })
    }
    componentDidMount(){
        this.getCartItemCount();
    }
    async getCartItemCount(){
        const resp=await axios.get('/api/getcartitemcount.php');
        this.updateCartItems(resp.data.itemCount);
    }
    render(){
        return(
            <div>
                <Nav cartItems={this.state.cartItems}/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/products" render={(routingProps)=>{
                            return <ProductRoutes {...routingProps} updateCart={this.updateCartItems}/>
                        }}/>
                        <Route path="/cart" component={Cart}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;