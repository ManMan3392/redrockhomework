export const getDayOfWeek = (
  date: Date,
): '周一' | '周二' | '周三' | '周四' | '周五' | '周六' | '周日' => {
  const dayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return dayMap[date.getDay()] as
    | '周一'
    | '周二'
    | '周三'
    | '周四'
    | '周五'
    | '周六'
    | '周日'
}