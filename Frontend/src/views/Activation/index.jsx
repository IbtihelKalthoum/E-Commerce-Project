import axios from '../../config/axios'
import { apis } from '../../config/apisUrls'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '../../components/Alert'

export default () => {

    const { token } = useParams()

    const [success, setsuccess] = useState(false)

    useEffect(() => {
        axios.get(apis.users.activate + token)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setsuccess(true)
                }
            })
    }, [])

    return (
        <>
            <div className="container mt-5">
                {
                    success
                    &&
                    <Alert
                        message='acount activated'
                        type='success'
                    />
                }
            </div>
        </>
    )
}