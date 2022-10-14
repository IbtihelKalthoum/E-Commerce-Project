import product1 from '../../assets/img/product/product1.jpg'
import product2 from '../../assets/img/product/product2.jpg'
import product3 from '../../assets/img/product/product3.jpg'
import product4 from '../../assets/img/product/product4.jpg'
import Loader from '../Loader'
import { useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"

export default ({ product }) => {


    const [crrentImage, setcrrentImage] = useState(0)



    return (
        <>
            {
                product
                    ?
                    <section className="product-details spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="product__details__pic">
                                        <div className="product__details__pic__left product__thumb nice-scroll">
                                            <div>
                                                {
                                                    product.images.map(im => {
                                                        return (

                                                            <a className="pt active" href="#product-1">
                                                                <img src={'http://localhost:5000/getimage/' + im.name} alt />
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div style={{ height: "100%" }} className="product__details__slider__content">
                                            <div className="product__details__pic__slider ">
                                                <AliceCarousel autoPlay autoPlayInterval="3000">
                                                    {
                                                        product.images.map(im => {
                                                            return (

                                                                <img style={{ height: '580px' }} className="" src={`http://localhost:5000/getimage/${im.name}`} alt />

                                                            )
                                                        })
                                                    }

                                                </AliceCarousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="product__details__text">
                                        <h3>{product.name}</h3>

                                        <div className="product__details__price">$ {product.price} </div>
                                        <p>{product.description}</p>
                                        <div className="product__details__button">
                                            <div className="quantity">
                                                <span>Quantity:</span>
                                                <div className="pro-qty">
                                                    <input type="text" defaultValue={product.qte} />
                                                </div>
                                            </div>
                                            <a href="#" className="cart-btn"><span className="icon_bag_alt" /> Add to cart</a>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="product__details__tab">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                        
                                                <p>
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <Loader />
            }
        </>
    )
}
