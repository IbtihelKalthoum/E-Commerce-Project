import product1 from '../../assets/img/product/product1.jpg'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../config/axios'
import { apis } from '../../config/apisUrls'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../features/cart/cartSlice'
import { useSelector } from 'react-redux'

export default ({ product }) => {

    const { role } = useContext(AuthContext)

    const [deleted, setdeleted] = useState(false)

    const deleteProduct = () => {
        axios.delete(apis.products.deleteone + product._id)
            .then(res => {
                console.log(res);
                setdeleted(true)
            })
    }

    const dispatch = useDispatch()

    const addProductToCart = () => {
        // appel addproduct redux action

        let p = {
            product: product,
            qte: 1
        }


        dispatch(addProduct({ pro: p }))
    }

    const cart = useSelector(state => state.cart.cart)

    return (
        <>
            {
                !deleted
                    ?
                    <div class="col-lg-3 col-md-4 col-sm-6 mix women">
                        <div class="product__item">
                            <div class="product__item__pic set-bg"
                                style={{ backgroundImage: `url(http://localhost:5000/getimage/${product.images[0].name})` }}
                            >
                                <ul class="product__hover">
                                    {
                                        role === 'admin'
                                        &&
                                        <>
                                            <li><a class="image-popup"><i class="las la-edit"></i></a></li>
                                            <li><a onClick={deleteProduct} ><i class="las la-trash"></i></a></li>
                                        </>
                                    }
                                    {
                                        cart.find(p => p.product._id === product._id)
                                            ?
                                            <li><a  ><i class="las la-check-circle"></i></a></li>
                                            :
                                            <li><a onClick={addProductToCart} ><span class="icon_bag_alt"></span></a></li>
                                    }
                                </ul>
                            </div>

                            <div class="product__item__text">
                                <Link to={`product/${product._id}`} ><h6><a style={{ color: cart.find(p => p.product._id === product._id) ? 'red' : "black" }}>{product.name}</a></h6>   </Link>

                                <div class="product__price">$ {product.price}</div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}
