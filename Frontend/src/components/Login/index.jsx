import Button from "../Button"
import Input from "../Input"
import Alert from "../Alert"
import PasswordInput from "../PasswordInput"
import './index.css'
import Fade from 'react-reveal/Fade';
import { useState } from "react";
import axios from '../../config/axios'
import { apis } from '../../config/apisUrls'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"

export default () => {

    const [data, setdata] = useState({
        email: '',
        password: '',
    })



    const [errors, seterrors] = useState([])

    const { setisauth, setrole, setuser } = useContext(AuthContext)

    const handledata = e => {
        const { value, name } = e.target
        setdata(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const login = () => {

        axios.post(apis.users.login, data)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setisauth(true)
                    setrole(res.data.role)
                    setuser(res.data.user)
                    window.location.href = '/'
                }
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.status === 422) {
                    seterrors(err.response.data.errors.details)
                }
            })

    }

    return (
        <>
            <Fade>
                <div className="login">
                    <Input errors={errors} onWrite={handledata} name='email' type='email' placeholder='email' />
                    <PasswordInput name='password' errors={errors} onWrite={handledata} />
                    <span style={{ display: 'flex', justifyContent: 'flex-end' }} ><Link to='/forget' >forget password?</Link></span>
                    {
                        errors.find(e => e.path[0] === 'isactive')
                        &&
                        <Alert
                            message="your acout is not active"
                            description='check out your email '
                            type='error'
                        />
                    }
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}  >
                        <Button Click={login} text='login' />
                    </div>
                </div>
            </Fade>
        </>
    )
}
