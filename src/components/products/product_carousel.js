import React, {Component} from 'react';

class ProductCarousel extends Component{
    componentDidMount(){
        M.Carousel.init(this.carousel);
    }
    render(){
        console.log('props: ',this.props);
        const items = this.props.images.map((image,index)=>{
            let url = `/dist/${image}`
            return (
                <a key={index} className="carousel-item">
                    <img src={url} className=""/>
                </a>
            )
        })
        return (
            <div ref={(element)=>this.carousel=element} className="carousel">
                {items}
            </div>
        )
    }
}

export default ProductCarousel;
