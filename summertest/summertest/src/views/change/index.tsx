import type { ReactNode, FC } from 'react'
import { memo, useState, useEffect } from 'react'
import { ChangeWrapper } from './style'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { formatNumber } from '@/utils/formatnumber'
import { useAppDispatch } from '@/store'
import { addCourseToWeek } from '@/store/scheduleSlice'

interface Iprops {
  children?: ReactNode
}

const Change: FC<Iprops> = () => {
  const [searchParams] = useSearchParams()
  const weeknumber = searchParams.get('weeknumber') as string
  const daynumber = searchParams.get('daynumber') as string
  const section = searchParams.get('section') as string
  const [inputValue, setInputValue] = useState('')
  const [records, setRecords] = useState<string[]>([]) // 存储历史记录
  const navigate = useNavigate()
  const [isSliding, setIsSliding] = useState(0)
  const [title, setTitle] = useState('为你的行程添加一个标题')
  const [isWarm, setIsWarm] = useState(false)
  const [isEntering, setIsEntering] = useState(true)
  const dispatch = useAppDispatch()

  const handleNextClick = () => {
    if (inputValue || isSliding !== 0) {
      setIsSliding(isSliding + 1)
      console.log(isSliding)
      if(isSliding === 1){
        setTitle('为你的行程添加具体内容')
      }
      if (isSliding === 0) {
        setInputValue('')
      } 
      setRecords((prev) => [...prev, inputValue])
      if (isSliding === 2) {
        console.log(weeknumber, daynumber, section, records[0], inputValue)
        const newCourse = {
          weekNumber: Number(weeknumber),
          section: Number(section),
          name: records[0],
          content: inputValue,
          id: Date.now(), // 生成唯一ID
        }
dispatch(addCourseToWeek({
    weekNumber: weeknumber,
    dayNumber: daynumber,
    course: newCourse,
  }),
)
      }
    } else {
      setIsWarm(true)
      setTimeout(() => {
        setIsWarm(false)
      }, 2000)
    }
  }

  useEffect(() => {
    // 触发进场动画
    const animationFrame = requestAnimationFrame(() => {
      setIsEntering(false);
    });
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <ChangeWrapper isEntering={isEntering}>
      <div
        className="back"
        onClick={() => {
          navigate(-1)
        }}
      ></div>
      <div className={isSliding === 2 ? 'hidden' : ''}></div>
      <input
        type="text"
        className="input"
        id="courseName"
        name="courseName"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        autoComplete="off" // 添加此属性禁用浏览器自动填充
      />
      <div className={`lasttitle ${isSliding === 1 ? '' : 'slide-out'}`}>
        {`标题： ${records[0]}`}
      </div>
      <div className={`realtitle ${isSliding === 2 ? 'maxtitle' : 'minitile'}`}>
        {records[0]}
      </div>
      <div
        className={`titlebg ${isSliding === 2 ? 'slide-out' : ''}`}
      >{`${title}`}</div>
      <div
        className="warming"
        style={{ top: isWarm && isSliding === 0 ? '107px' : '203px' }}
      >
        掌友，标题不能为空呦！
      </div>
      <div className="bg"></div>
      <div className={`choice ${isSliding !== 0 ? 'slide-out' : ''}`}>
        {[
          '自习',
          '值班',
          '考试',
          '英语',
          '开会',
          '作业',
          '补课',
          '实验',
          '复习',
          '学习',
        ].map((item) => (
          <div
            className="choice-item"
            key={item}
            data-value={item}
            onClick={(e) => {
              if (e.currentTarget.dataset.value)
                setInputValue(e.currentTarget.dataset.value as string)
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={`items ${isSliding !== 2 ? 'slide-out' : ''}`}>
        <div className="weeknumber item">{`第${formatNumber(weeknumber)}周`}</div>
        <div className="time item">{`周${formatNumber(Number(daynumber) + 1)} 第${formatNumber(section)}节课`}</div>
        <div className="remind item">不提醒</div>
        <div className="todo item">加入待办</div>
      </div>
      <div className="next" onClick={handleNextClick}></div>
    </ChangeWrapper>
  )
}

export default memo(Change)
