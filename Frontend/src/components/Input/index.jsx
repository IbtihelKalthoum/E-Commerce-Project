import './index.css'

export default ({ value, errors, placeholder, type, name, disabled, onWrite }) => {
    return (
        <>
            <div className="input_container">
                <input value={value} className={`Input ${errors && errors.find(e => e.path[0] === name) ? 'has_error' : ''}`} onChange={onWrite} name={name} type={type} placeholder={placeholder} disabled={disabled} />

                {
                    errors && errors.find(e => e.path[0] === name)
                    &&
                    <span className='error_message ml-2' > {errors.find(e => e.path[0] === name).message} </span>
                }
            </div>
        </>
    )
}
