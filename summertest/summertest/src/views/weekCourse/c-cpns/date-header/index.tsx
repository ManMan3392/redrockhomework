import type { ReactNode, FC } from 'react'
import { memo } from 'react'
import { HeaderWrapper } from './style'
import { Course } from '@/service/types'

interface Iprops {
  children?: ReactNode
  filteredDates: Course[][]
}
const DateHeader: FC<Iprops> = (props) => {
  const { filteredDates } = props;
  const safeDates = Array.isArray(filteredDates) ? filteredDates : [];

  return (
    <HeaderWrapper>
      <div className="date-header">
        <div className="days">
          {safeDates.length > 0 && (
            <div className="month">
              {Number(safeDates[0]?.[0]?.date?.split('-')[1])}月
            </div>
          )}
          {safeDates?.map((dateInfo, index) => {
            if (!dateInfo || !dateInfo[0]?.date) return null;
            const [,,day] = dateInfo[0].date.split('-')?.map(Number);
            return (
              <div key={index} className="day-item">
                <div>{dateInfo[0].day}</div>
                <div className="miniday">{`${day}日`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </HeaderWrapper>
  );
};
export default memo(DateHeader)
