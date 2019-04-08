import React, {Component} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'


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
        console.log(details);
        const carousel = details.images.map((image,index)=>{
            let url = `/dist/${image}`
            return (
                <a key={index} className="carousel-item">
                    <img src={url} className=""/>
                </a>
            )
        })
        $(document).ready(function(){
            $('.carousel').carousel();
            setInterval(()=>{
                $('.carousel').carousel('next');
            },5000)
        });
        const{description = 'No description availiable',name,miscDetails}=details;
        
        return(
            <div className="product-details">
                <h1 className="center">{name}</h1>
                <div className="carousel">
                    {carousel}
                </div>
                <p>{description}</p>
            </div>
        )
    }
}

export default ProductDetails;