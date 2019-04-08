import React, {Component} from 'react';

class ProductCarousel extends Component{
    componentDidMount(){
        const config = {
            numVisible:1,
            indicators:true
        }
        M.Carousel.init(this.carousel,config);
    }
    render(){
        const items = this.props.images.map((image,index)=>{
            let url = `/dist/${image}`
            return (
                <a key={index} className="carousel-item">
                    <img src={url} className=""/>
                </a>
            )
        })
        return (
            <div ref={(element)=>this.carousel=element} className="col s12 m4 carousel">
                {items}
            </div>
        )
    }
}

export default ProductCarousel;
