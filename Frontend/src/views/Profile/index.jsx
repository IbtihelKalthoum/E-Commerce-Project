
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Avatar, message } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './index.css';
import axios from '../../config/axios'
import { apis } from '../../config/apisUrls'

export default () => {

    const { setuser, user } = useContext(AuthContext)

    const [infos, setinfos] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        zip_code: user.zip_code,
    })

    const handlechage = e => {
        const { value, name } = e.target
        setinfos(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const uploadAvatar = e => {

        let data = new FormData()

        data.append('avatar', e.target.files[0])

        axios.put(apis.users.uploadavatar, data)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setuser(res.data.data)
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const upadte = () => {
        axios.put(apis.users.register, infos)
            .then(res => {
                setinfos({
                    username: res.data.data.username,
                    email: res.data.data.email,
                    phone: res.data.data.phone,
                    address: res.data.data.address,
                    zip_code: res.data.data.zip_code,
                })
                message.success('user informations successfuly updated');
            })
    }

    return (
        <>
            <div className="container mt-4">
                <div>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className='col-md-8'>
                            <div className='text-center mb-3 image_item'>
                                {user && <Avatar size={175} style={{ marginBottom: '20px', background: '#8d8a8a' }} src={'http://localhost:5000/getimage/' + user.avatar}
                                />}
                                <input type='file' hidden id='iconupload' onChange={uploadAvatar} />
                                <i class="las la-pen" onClick={() => document.getElementById('iconupload').click()}></i>
                            </div>
                            <Input onWrite={handlechage} value={infos.username} type='text' name='username' placeholder='username' />
                            <Input onWrite={handlechage} value={infos.email} type='email' name='email' placeholder='email' disabled />
                            <Input onWrite={handlechage} value={infos.phone} type='number' name='phone' placeholder='phone' />
                            <Input onWrite={handlechage} value={infos.address} type='text' name='address' placeholder='address' />
                            <Input onWrite={handlechage} value={infos.zip_code} type='number' name='zip_code' placeholder='zip_code' />

                            <div style={{ display: 'flex', justifyContent: 'center' }}  >
                                <Button Click={upadte} text='Save' />
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}
