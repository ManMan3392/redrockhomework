import styled from 'styled-components';
import my_courses_bg from '@/assets/img/my_courses_bg.png'
import activ_bg from '@/assets/img/image.png'


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
  .course-item {
    width: 47px;
    background: #fff;
    touch-action: none; /* 禁用触摸默认行为 */
    user-select: none; /* 防止文本选择 */
    margin-left: 8px;
    overflow: hidden;
    position: relative;
    background: #fff;
  }
  .many-courses {
    &::after {
      content: '';
      position: absolute;
      top: 3px;
      right: 10px;
      width: 10px;
      height: 3px;
      border-radius: 2px;
      background-color: rgb(230, 149, 152);
    }
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
  .others-course {
    background-color: rgb(224, 243, 253) !important;
    color: rgb(93, 185, 239) !important;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .active {
    &::after {
      content: '';
      position: absolute;
      top: 0px;
      right: 0px;
      left: 0px;
      height: var(--stretched-height, 58px);
      border-radius: 8px;
      /* background-color: grey; */
      background: url(${activ_bg}) no-repeat;
      background-position: top center;
      background-size: 100% 100%;
      transition: height 0.1s ease;
  
    }
  }
  .course-top,
  .course-bottom {
    position: relative;
    border-radius: 8px;
    width: 100%;
    height: 100%;
  }

  body.dragging-fixed {
    overflow: hidden !important;
    position: fixed !important;
    height: 100vh !important;
  }
  .table_wrapper {
    touch-action: none; // 仅在课程元素上设置
    overflow: hidden; /* 防止内部滚动 */
    position: relative;
  }

  .course_item {
    /* ... existing styles ... */
    user-select: none; /* 禁止文本选择 */
    touch-action: none; /* 禁止触摸操作 */
  }

  .dragging_overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
    pointer-events: none;
    background: transparent;
  }
`
