export default ({text , Click }) => {
    return (
        <>
            <button onClick={Click} type="submit" class="site-btn">{text}</button>
        </>
    )
}
