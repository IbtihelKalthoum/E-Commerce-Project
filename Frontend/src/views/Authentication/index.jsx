import { useState } from 'react'
import Login from '../../components/Login'
import Register from '../../components/Register'
import './index.css'

export default () => {

    const [select, setselect] = useState(false)

    return (
        <>
            <div className="container">
                <div className="auth mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5 col-sm-12">
                            <div className="switch">
                                <div className={`togler ${select ? 'moveright' : 'moveleft'} `}>

                                </div>
                                <span onClick={() => setselect(!select)} >Login</span>
                                <span onClick={() => setselect(!select)} >register</span>
                            </div>

                            <br />
                            {
                                select
                                    ?
                                    <Register />
                                    :
                                    <Login />

                            }


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
