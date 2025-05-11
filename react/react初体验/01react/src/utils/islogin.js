export function islogin(OriginComponent) {
    return (props) => {
        const islogined = localStorage.getItem('token')
        return (
            islogined ? <OriginComponent {...props} token={islogined} /> : <h2>请先登录</h2>
        )
    }
}