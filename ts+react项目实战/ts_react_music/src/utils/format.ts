export function formatCount(count: number) {
  if (count > 100000000) {
    return Math.floor(count / 100000000) + '亿'
  } else if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

export function getImageSize(
  imgUrl: string,
  width: number,
  height: number = width,
) {
  return imgUrl + `?param=${width}x${height}`
}
