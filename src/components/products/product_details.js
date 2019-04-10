import React, {Component} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import ProductCarousel from './product_carousel';
import {formatMoney} from '../../helpers'
import MiscDetails from './misc_details';
import ProductAdd from './product_add';

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
        const {params}=this.props.match;
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
                            <ProductAdd productId={params.product_id}/>
                        <p>{description}</p>
                        <MiscDetails details={miscDetails}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;