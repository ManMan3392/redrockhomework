import hyRequest from "../request"

export const getHomeGoodPriceData = () => {
    return hyRequest.get(
        {
            url: '/home/goodprice'
        }
    )
}