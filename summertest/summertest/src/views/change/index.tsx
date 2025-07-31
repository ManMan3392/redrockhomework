import type { ReactNode, FC } from 'react'
import { memo, useState, useEffect } from 'react'
import { ChangeWrapper } from './style'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { formatNumber } from '@/utils/formatnumber'
import { useAppDispatch, useAppSelector } from '@/store'
import { addCourseToWeek } from '@/store/scheduleSlice'
import Changepage from './c-cpns/changepage'
import { todolist } from '@/assets/data/todo'
import {updateChangeCourseTime} from '@/store/changeCourseSlice'
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
  const location = useLocation()
  const weeksData = useAppSelector((state) => state.schedule.weeks)
  const target = location.state?.selectedCourse
  // 添加realtitleValue状态管理输入框内容
  const [realtitleValue, setRealtitleValue] = useState('')
  useEffect(() => {
    if (target) {
      setIsSliding(2)
      setRealtitleValue(target.name)
      // 设置inputValue为target的content属性
      setInputValue(target.content || '')
      
      // 新增：同步target的时间属性到Redux
      dispatch(updateChangeCourseTime({
        weeknumber: [target.weekNumber],
        daynumber: [target.dayNumber],
        section: [[target.section, target.section]] // 保持节次范围一致
      }));
    }
  }, [target, dispatch]); // 添加dispatch依赖
  

  // 添加检查时间段是否有课程的函数
  const checkTimeConflict = () => {
    // 获取所有周课程数据
    let hasCourse = false;
    let conflictCourses: any[] = [];

    weeknumber.forEach(week => {
      for (let i = 0; i < daynumber.length; i++) {
        const day = daynumber[i];
        const sectionInfo = section[i];
        const startSection = sectionInfo[0];
        const endSection = sectionInfo[1];

        // 查找对应周的数据
        const weekData = weeksData.find(w => w.weekNumber === week);
        if (weekData) {
          // 获取对应天的课程
          const dayCourses = weekData.dailyCourses[day] || [];

          // 检查是否有课程在该时间段
          dayCourses.forEach(course => {
            const courseEndSection = Number(course.section) + Number(course.cycle || 0);
            const isOverlap = (
              (startSection >= Number(course.section) && startSection < Number(courseEndSection)) ||
              (endSection > Number(course.section) && endSection <= Number(courseEndSection)) ||
              (startSection <= Number(course.section) && endSection >= Number(courseEndSection))
            );

            if (isOverlap) {
              hasCourse = true;
              conflictCourses.push({
                week,
                day,
                courseName: course.name,
                courseSection: `${course.section}-${courseEndSection - 1}`
              });
            }
          });
        }
      }
    });

    console.log('时间段是否有课程:', hasCourse);
    if (hasCourse) {
      console.log('冲突的课程:', conflictCourses);
    }

    return hasCourse;
  };

  // 修改handleNextClick函数，在添加课程前调用检查函数
  const handleNextClick = () => {
    if (inputValue || isSliding !== 0) {
      setIsSliding(isSliding + 1)
      setTitle('为你的行程添加具体内容')

      if (isSliding === 0) {
        setRealtitleValue(inputValue);
        setInputValue('');
      }
      setRecords((prev) => [...prev, inputValue])
      if (isSliding === 2) {
        // 调用检查函数并打印结果
        const hasConflict = checkTimeConflict();

        weeknumber.forEach(week => {
          for (let i = 0; i < daynumber.length; i++) {
            const day = daynumber[i];
            const sectionInfo = section[i];
            const newCourse = {
              id: Date.now() + week + i,
              name: realtitleValue,
              weekNumber: week,
              dayNumber: day,
              section: sectionInfo[0],
              cycle: sectionInfo[1] - sectionInfo[0],
              content: inputValue,
              courseName: '自定义',
            }
            dispatch(
              addCourseToWeek({
                weekNumber: week,
                dayNumber: day,
                course: newCourse,
              }),
            )
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
        {`标题： ${realtitleValue}`}
      </div>
      {/* 将静态文本div改为透明输入框 */}
      <input
        type="text"
        className={`realtitle ${isSliding === 2 ? 'maxtitle' : 'minitile'}`}
        value={realtitleValue}
        onChange={(e) => setRealtitleValue(e.target.value)}
      />
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
              key={index}
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
