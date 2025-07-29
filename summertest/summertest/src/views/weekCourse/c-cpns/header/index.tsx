import type { ReactNode, FC } from 'react'
import { memo} from 'react'
import { HeaderWrapper } from './style'
import { formatNumber } from '@/utils/formatnumber'
import { useAppSelector } from '@/store'

interface Iprops {
  children?: ReactNode
  currentWeek: number
  onWeekChange: (week: number) => void
}
const Head: FC<Iprops> = (props) => {
  const { currentWeek, onWeekChange } = props
  const { weeks } = useAppSelector((state) => state.schedule)
  // 从课程数据中提取唯一日期及其对应的周数
  const dates = weeks
    .flatMap((week) =>
      week.courses.map((course) => ({
        date: course.date,
        weekNumber: week.weekNumber,
      })),
    )
    .filter(
      (item, index, self) =>
        // 去重：只保留第一个出现的日期
        self.findIndex((i) => i.date === item.date) === index,
    )

  return (
    <HeaderWrapper>
      <div className="header">
        <div className="week-navigation">
          <h2>第{formatNumber(currentWeek)}周</h2>
        </div>
        <button
          className="back-to-today"
          onClick={() => {
            const today = new Date().toISOString().split('T')[0]
            const todayInfo = dates.find((info) => info.date === today)
            if (todayInfo) {
              onWeekChange(todayInfo.weekNumber)
            }

            //else回到整学期
          }}
        >
          回到本周
        </button>
      </div>
    </HeaderWrapper>
  )
}
export default memo(Head)

interface HeaderProps {
  uniqueWeeks: number[]
  currentWeek: number
  onWeekChange: (week: number) => void
  showBackToCurrent?: boolean // 新增属性
  onBackToCurrent?: () => void // 新增属性
}

const Header: React.FC<HeaderProps> = ({
  uniqueWeeks,
  currentWeek,
  onWeekChange,
  showBackToCurrent = false,
  onBackToCurrent,
}) => {
  return (
    <HeaderWrapper>
      {/* ... 现有周选择器代码 ... */}
      {showBackToCurrent && onBackToCurrent && (
        <button className="back-to-current" onClick={onBackToCurrent}>
          回档本周
        </button>
      )}
    </HeaderWrapper>
  )
}
