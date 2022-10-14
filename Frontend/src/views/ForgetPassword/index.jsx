import { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import './index.css'
import axios from '../../config/axios'
import { apis } from '../../config/apisUrls'
import Alert from "../../components/Alert"

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
const [data, setdata] = useState({
    email: '',
})

const [errors, seterrors] = useState([])

const [success, setsuccess] = useState(false)

const handledata = e => {
    const { value, name } = e.target
    setdata(prev => ({
        ...prev,
        [name]: value
    }))
}

const ForgetPassword = () => {

seterrors([])
    axios.post(apis.users.forget, data)
        .then(res => {
            console.log(res);
            if(res.status===200){
                setsuccess(true)
               }
        })
        .catch(err => {
            console.log(err.response);
            if (err.response.status === 422) {
                seterrors(err.response.data.errors.details)
            }
        })

}

    return(
        <>
        
        <div className="container">
       
        {
                    !success
                    ?
            <div className="row justify-content-center  mt-5 ">
                <div className="col-md-5col-sm-12 forget ">
                    <h4>Forget Password</h4>
                    <span className="textforget">Inter your email to receive the reset password link</span>
                    <br/>
                    <br/>

                    <Input  errors={errors} onWrite={handledata} type='email' name='email' placeholder='email' />
                    <br/>
                    <div style={{display:'flex' , justifyContent:'center'}}>
                    <Button  Click={ForgetPassword} text='Send' />
                    </div>
                </div>
                
            </div>
             :
             <Alert  
             message="check your mail box to reset password"
             description='check your mail box to reset password '
             type='success'/>
             }
             
        </div>
       
        </>
    )
    
}