import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../config/axios'
import { apis } from '../../config/apisUrls'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default () => {

    const { isauth, role, setisauth, setrole, setuser, user } = useContext(AuthContext)
    const history = useHistory()
    const logout = () => {
        axios.post(apis.users.logout)
            .then(res => {
                setisauth(false)
                setrole('visitor')
                setuser(null)
                history.push('/')
            })
    }

    const cart = useSelector(state => state.cart.cart)

    return (
        <>
            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-2">
                            <div className="header__logo">
                                <a href="./index.html"><img src="img/logo.png" alt /></a>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><Link to="/">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    {
                                        isauth
                                        &&
                                        <li><Link to="/dashboard">Dashboard</Link>
                                            <ul className="dropdown">
                                                {role === 'admin' && <li><Link to="/products">Products</Link></li>}
                                                {role === "admin" && <li><Link to="/categories">Categories</Link></li>}
                                                {role === 'admin' && <li><Link to="/users">Users</Link></li>}
                                                <li><Link to="/orders">Orders</Link></li>
                                            </ul>
                                        </li>
                                    }
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__right d-flex">
                                {
                                    !isauth
                                    &&
                                    <div className="header__right__auth">
                                        <Link to="/authentication">Login</Link>
                                        <Link to="/authentication">Register</Link>
                                    </div>
                                }
                                <ul className="header__right__widget">
                                    <li><span className="icon_search search-switch" /></li>
                                    {/* <li><a href="#"><span className="icon_heart_alt" />
                                        <div className="tip">2</div>
                                    </a></li> */}
                                    <li><Link to="/cart"><span className="icon_bag_alt" />
                                        <div className="tip">{cart.length}</div>
                                    </Link></li>
                                </ul>
                                {
                                    isauth
                                    &&
                                    <div>
                                        <Dropdown overlay={
                                            <Menu>
                                                <Menu.Item danger><Link to="/profile">profile</Link></Menu.Item>
                                                <Menu.Item onClick={logout} danger>logout</Menu.Item>
                                            </Menu>
                                        }>
                                            {<Avatar style={{ marginLeft: '25px' }} src={'http://localhost:5000/getimage/' + user.avatar} />}
                                        </Dropdown>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open">
                        <i className="fa fa-bars" />
                    </div>
                </div>
            </header>
        </>
    )
}
