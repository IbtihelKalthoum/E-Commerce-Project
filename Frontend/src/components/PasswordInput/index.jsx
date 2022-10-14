import { useState } from 'react'
import './index.css'

export default ({ onWrite, errors, name }) => {

    const [type, settype] = useState(false)

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: '10px' }} >

                <div className={`password_input ${errors && errors.find(e => e.path[0] === name) ? 'pass_has_error' : ''}`}>
                    <input onChange={onWrite} type={type ? 'text' : 'password'} placeholder={name} name={name} />
                    {
                        type
                            ?
                            <i onClick={() => settype(!type)} class="las la-low-vision icon_eye"></i>
                            :
                            <i onClick={() => settype(!type)} class="las la-eye icon_eye"></i>
                    }
                </div>
                <span className='pass_error' > {errors && errors.find(e => e.path[0] === name) ? errors.find(e => e.path[0] === name).message : <span></span>} </span>
            </div>
        </>
    )
}
