import { Alert } from 'antd';

export default ({ username }) => {
    return (
        <>
            <Alert
                message="Success Register"
                description={username + " your acount has been successfuly registred check your mail box to activate your acount "}
                type="success"
                showIcon
            />
        </>
    )
}
