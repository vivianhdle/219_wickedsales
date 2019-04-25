import React, {Component} from 'react';
import ProductItem from './product_item';
import {connect} from 'react-redux';
import {getAllProducts} from '../../actions'

class ProductList extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }
    goToDetails = id => {
        this.props.history.push(`/products/${id}`)
    }
    componentDidMount(){
        this.props.getAllProducts();
    }
    render(){
        const {products} = this.state
        const productList = this.props.products.map((product)=>{
            return <ProductItem key={product.id} {...product} goToDetails={this.goToDetails}/>
        })
        return(
            <div className="product-list">
                <h1 className="center">Wicked Product List</h1>
                    <ul className="collection">
                        {productList}
                    </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        products:state.products.list
    }
}

export default connect(mapStateToProps,{
    getAllProducts:getAllProducts
})(ProductList);