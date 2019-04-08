import React, {Component} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import ProductCarousel from './product_carousel';
import {formatMoney} from '../../helpers'
import MiscDetails from './misc_details';


class ProductDetails extends Component{
    state = {
        details:null
    }
    componentDidMount(){
        this.getDetails();
    }
    async getDetails(){
        const {params} = this.props.match;
        const resp = await axios.get(`/api/getproductdetails.php?productId=${params.product_id}`);
        if(resp.data.success){
            this.setState({
            details:resp.data.productInfo
            })
        }else {
            this.setState({
                details:false
            })
        }
        
        
    }
    render(){
        const {details}=this.state;
        if(details===null){
            return <h1 className="center">LOADING...</h1>
        }else if(!details){
            return <h1 className="center">No product found</h1>
        }
        const{description = 'No description availiable',name,miscDetails,images,price}=details;
        return(
            <div className="product-details">
                <h1 className="center">{name}</h1>
                <div className="row col s12 m8">
                    <ProductCarousel images={images}/>
                    <div className="col s12 m8">
                        <div className="right-align product-price">{formatMoney(price)}</div>
                        <div className="right-align add-to-cart">
                            <span className="qty-container">
                                <button className="btn btn-floating green lighten-3 btn-small"><i class="material-icons">remove</i></button>
                                <span className="product-qty">1</span>
                                <button className="btn btn-floating green lighten-3 btn-small"><i class="material-icons">add</i></button>
                            </span>
                            <button className="green lighten-3 btn"><i class="material-icons">add_shopping_cart</i></button>
                        </div>
                        <p>{description}</p>
                        <MiscDetails details={miscDetails}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;