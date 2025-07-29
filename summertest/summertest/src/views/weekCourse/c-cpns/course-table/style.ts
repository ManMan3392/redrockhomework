import styled from 'styled-components';
import my_courses_bg from '@/assets/img/my_courses_bg.png'



export const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 51px);
  width: 394px;
  height: 673px;
  display: flex;
  position: relative;
  /* 节次列样式 */
  .section-column {
    width: 29px;
  }

  .section-cell {
    height: 55px;
    font-size: 14px;
    text-align: center;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 课程网格容器 */
  .course-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 51px);
    grid-template-rows: repeat(12, 57px);
    gap: 1px;
    padding: 1px;
    padding-left: 3px;
  }

  /* 课程单元格样式 */
  .courseitem {
    width: 47px;
    margin-left: 8px;
    overflow: hidden;
    position: relative;
    background: #fff;
  }

  .has-courses {
    display: flex;
    align-items: flex-start;
  }

  .course-info {
    background-color: #e8f0fe;
    border-radius: 8px;
    padding: 5px;
    width: 47px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
   .my-course {
    text-align: center !important;
    color: rgb(45, 55, 62) !important;
    background-image: url(${my_courses_bg}) !important;
  }
  .course-info:hover {
    background-color: #d2e3fc;
  }

  .course-info.section-1,
  .course-info.section-3 {
    background-color: rgb(249, 232, 217);
    color: rgb(232, 144, 74);
  }

  .course-info.section-5,
  .course-info.section-7 {
    background-color: rgb(248, 228, 227);
    color: rgb(230, 149, 152);
  }

  .course-info.section-9,
  .course-info.section-11 {
    background-color: rgb(221, 228, 248);
    color: rgb(121, 131, 205);
  }

  .course-name,
  .course-place {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box; /* 缺少的关键属性 */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3; /* 标准属性，增强兼容性 */
  }

  .course-name {
    font-weight: 500;
    margin-bottom: 14px;
    height: 90px;
  }

  .no-course {
    border-radius: 8px;
    width: 47px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .course-top,
  .course-bottom {
    border-radius: 8px;
    width: 100%;
    height: 100%;
  }
`
