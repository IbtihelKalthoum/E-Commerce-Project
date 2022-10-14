import PasswordInput from '../PasswordInput'
import Input from '../Input'
import Button from '../Button'
import Fade from 'react-reveal/Fade';
import { useState } from 'react';
import axios from '../../config/axios';
import { apis } from '../../config/apisUrls';
import RegisterSuccess from '../RegisterSuccess';


export default () => {

    const [data, setdata] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        zip_code: '',
    })

    const [errors, seterrors] = useState([])

    const handledata = e => {
        const { value, name } = e.target

        let arr = [...errors]

        let dt = arr.filter(e => e.path[0] !== name)

        seterrors(dt)

        setdata(prev => ({
            ...prev,
            [name]: value
        }))

    }

    const [success, setsuccess] = useState(false)

    const register = () => {
        axios.post(apis.users.register, data)
            //status 200 201
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    // success register
                    setsuccess(true)
                }
            })
            //status 400 401 403 422 500
            .catch(err => {
                console.log(err.response);
                if (err.response.status === 422)
                    seterrors(err.response.data.errors.details)
            })
    }

    return (
        <>
            <Fade>
                {
                    !success
                        ?
                        <div className="register">
                            <Input errors={errors} onWrite={handledata} name='username' placeholder='username' type='text' />
                            <Input errors={errors} onWrite={handledata} name='email' placeholder='email' type='email' />
                            <PasswordInput name='password' errors={errors} onWrite={handledata} />
                            <Input errors={errors} onWrite={handledata} name='phone' placeholder='phone' type='number' />
                            <Input errors={errors} onWrite={handledata} name='address' placeholder='address' type='text' />
                            <Input errors={errors} onWrite={handledata} name='zip_code' placeholder='zip_code' type='number' />
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'center' }} >
                                <Button Click={register} text='register' />
                            </div>
                        </div>
                        :
                        <RegisterSuccess username={data.username} />
                }
            </Fade>
        </>
    )
}
