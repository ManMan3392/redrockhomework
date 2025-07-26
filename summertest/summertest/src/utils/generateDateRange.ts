import { formatDate } from '@/utils/formatDate'
import { getDayOfWeek } from '@/utils/getDayOfWeek'

export const generateDateRange = (
  startDateStr: string,
  endDateStr: string,
): Array<{ date: string; day: string }> => {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  const dateRange: Array<{ date: string; day: string }> = []

  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const dateStr = formatDate(currentDate)
    const dayOfWeek = getDayOfWeek(currentDate)

    dateRange.push({
      date: dateStr,
      day: dayOfWeek,
    })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dateRange
}