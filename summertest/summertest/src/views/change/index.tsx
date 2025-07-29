import type { ReactNode, FC } from 'react'
import { memo, useState, useEffect } from 'react'
import { ChangeWrapper } from './style'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { formatNumber } from '@/utils/formatnumber'
import { useAppDispatch, useAppSelector } from '@/store'
import { addCourseToWeek } from '@/store/scheduleSlice'
import Changepage from './c-cpns/changepage'
import { todolist } from '@/assets/data/todo'
import { courseNames } from '@/assets/data/coursesdetail'

interface Iprops {
  children?: ReactNode
}

const Change: FC<Iprops> = () => {
  const [isPush, setIsPush] = useState(false)
  const weeknumber = useAppSelector((state) => state.changeCourse.weeknumber)
  const daynumber = useAppSelector((state) => state.changeCourse.daynumber)
  const section = useAppSelector((state) => state.changeCourse.section)
  const [inputValue, setInputValue] = useState('')
  const [records, setRecords] = useState<string[]>([])
  const navigate = useNavigate()
  const [isSliding, setIsSliding] = useState(0)
  const [title, setTitle] = useState('为你的行程添加一个标题')
  const [isWarm, setIsWarm] = useState(false)
  const [isEntering, setIsEntering] = useState(true)
  const [isChangePage, setIsChangePage] = useState(false)
  const [chooseWeek, setChooseWeek] = useState(false)
  const dispatch = useAppDispatch()

  const handleNextClick = () => {
    if (inputValue || isSliding !== 0) {
      setIsSliding(isSliding + 1)
      console.log(isSliding)
      setTitle('为你的行程添加具体内容')

      if (isSliding === 0) {
        setInputValue('')
      }
      setRecords((prev) => [...prev, inputValue])
      if (isSliding === 2) {
        weeknumber.forEach(week => {
          for (let i = 0; i < daynumber.length; i++) {
            const day = daynumber[i];
            const sectionInfo = section[i];
            const newCourse = {
              id: Date.now() + week + i, // 修复：增加week确保不同周课程ID唯一
              name: records[0],
              weekNumber: week,
              dayNumber: day,
              section: sectionInfo[0], 
              cycle: sectionInfo[1],  
              content: inputValue,
              courseNames:'自定义'
            }
            dispatch(
              addCourseToWeek({
                weekNumber: week, // 修复：使用当前循环的week而非整个数组
                dayNumber: day,   // 修复：使用当前循环的day而非整个数组
                course: newCourse,
              }),
            )
            console.log(newCourse)
          }
        })
        navigate(-1)
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
      setIsEntering(false)
    })
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <ChangeWrapper $isEntering={isEntering}>
      <div
        className="back"
        onClick={() => {
          navigate(-1)
        }}
      ></div>
      <div
        className={isSliding === 2 ? 'hidden' : ''}
        onClick={() => {
          if (isChangePage) {
            setIsChangePage(false)
            setIsPush(false)
          }
        }}
      ></div>
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
        {todolist.map((item) => (
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
        <div className="section">
          {weeknumber.map((item,index) => (
            <div
              key={item + index}
              className="time"
              onClick={() => {
                setIsChangePage(true)
                setChooseWeek(true)
              }}
            >{`第${formatNumber(item)}周`}</div>
          ))}
        </div>
        <div className="section">
          {daynumber.map((item, index) => (
            <div
              key={item + index}
              className="time"
              onClick={() => {
                setIsChangePage(true)
                setChooseWeek(false)
              }}
            >
              {`周${formatNumber(Number(item) + 1)} 
              第${formatNumber(section[index][0])}节课 
              ${section[index][1] === section[index][0] || !section[index][1] ? '' : `-第${formatNumber(section[index][1])}节课`}`}
            </div>
          ))}

          <div
            className="add"
            onClick={() => {
              setIsChangePage(true)
              setIsPush(true)
              setChooseWeek(false)
            }}
          ></div>
        </div>

        <div className="remind item">不提醒</div>
        <div className="todo item">加入待办</div>
      </div>
      <div className="next" onClick={handleNextClick}></div>
      <Changepage
        isChangePage={isChangePage}
        isPush={isPush}
        setIsChangePage={setIsChangePage}
        chooseWeek={chooseWeek}
      />
    </ChangeWrapper>
  )
}

export default memo(Change)
