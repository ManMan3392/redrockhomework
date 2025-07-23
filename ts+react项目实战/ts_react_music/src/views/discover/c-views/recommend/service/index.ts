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

export function getNewAlbum() {
  return hyRequest.get({
    url: '/album/list',
    params: {
      limit: 10,
    },
  })
}
