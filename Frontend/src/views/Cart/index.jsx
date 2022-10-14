import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { changeQuantity, deletePrduct, resetCart } from "../../features/cart/cartSlice"
import './index.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "../../config/axios"
import { apis } from "../../config/apisUrls"

export default () => {

    const cart = useSelector(state => state.cart.cart)

    const dispatch = useDispatch()

    const [total, settotal] = useState(0)

    useEffect(() => {
        let sum = 0

        for (let item of cart) {
            sum += item.product.price * item.qte
        }

        settotal(sum)

    }, [cart])


    const createOrder = () => {

        let t = []

        for (let item of cart) {
            t.push({
                product: item.product._id,
                qte: item.qte
            })
        }

        let data = {
            products: t,
            prix_total: total
        }

        axios.post(apis.orders.create, data)
            .then(res => {
                console.log(res);
                dispatch(resetCart())
            })

    }


    return (
        <>
            <section className="shop-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map(p => {
                                                return (

                                                    <tr>
                                                        <td className="cart__product__item">
                                                            <img style={{ height: '100px', width: '100px' }} src={'http://localhost:5000/getimage/' + p.product.images[0].name} alt />
                                                            <div className="cart__product__item__title">
                                                                <h6>{p.name}</h6>

                                                            </div>
                                                        </td>
                                                        <td className="cart__price">$ {p.product.price}</td>
                                                        <td className="cart__quantity">

                                                            {p.qte > 1 && <button onClick={() => dispatch(changeQuantity({ data: { id: p.product._id, value: -1 } }))} >-</button>}
                                                            <span>{p.qte}</span>
                                                            {p.qte < p.product.qte && <button onClick={() => dispatch(changeQuantity({ data: { id: p.product._id, value: +1 } }))} >+</button>}

                                                        </td>
                                                        <td className="cart__total">$ {p.product.price * p.qte}</td>
                                                        <td className="cart__close"><span onClick={() => dispatch(deletePrduct({ id: p.product._id }))} className="icon_close" /></td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="cart__btn">
                                <Link to='/shop' > <a >Continue Shopping</a></Link>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-6">

                        </div>
                        <div className="col-lg-4 offset-lg-2">
                            <div className="cart__total__procced">
                                <h6>Cart total</h6>
                                <ul>

                                    <li>Total <span>$ {total}</span></li>
                                </ul>
                                <a onClick={() => createOrder()} className="primary-btn">Proceed to checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}