export const formatNumber = (num: number | string) => {
  num = Number(num)
  const basicNumbers = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
  ]

  if (num <= 10) {
    return basicNumbers[num - 1]
  }

  if (num < 20) {
    return '十' + basicNumbers[num - 11]
  }

  const tens = Math.floor(num / 10)
  const ones = num % 10
  const tenStr = tens === 2 ? '二十' : '三十'
  return ones === 0 ? tenStr : tenStr + basicNumbers[ones - 1]
}