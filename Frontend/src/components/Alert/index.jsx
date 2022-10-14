import { Alert } from 'antd';

export default ({ message, description, type }) => {
    return (
        <>
            <Alert
                message={message}
                description={description}
                type={type}
                showIcon
            />
        </>
    )
}