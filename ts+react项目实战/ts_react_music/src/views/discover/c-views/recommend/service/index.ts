import hyRequest from '@/service'

export function getBanners() {
  return hyRequest.get({
    url: '/banner',
  })
}

export function getHotRecommend() {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit: 8,
    },
  })
}
