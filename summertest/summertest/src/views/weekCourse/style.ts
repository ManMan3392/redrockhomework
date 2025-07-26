import styled from 'styled-components'

export const WeekWrapper = styled.div`
  .course-schedule-container {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    min-height: 600px; /* 确保动画过程中容器高度稳定 */
  }

  /* 左移出动画 */
  .left {
    transform: translateX(-100%);
    opacity: 0;
  }

  /* 右移入动画 */
  .right {
    transform: translateX(0);
    opacity: 1;
  }

  .course-schedule-container {
    width: 394px !important;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    padding: 20px 10px !important;
    background-color: #fff;
  }

  .course-detail {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;
  }

  .course-detail h3 {
    margin-top: 0;
    color: #202124;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }

  .detail-item {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .detail-item span:first-child {
    font-weight: 500;
    color: #5f6368;
    display: inline-block;
    width: 70px;
  }
  .schedule-content {
    margin-top: 20px;
  }

  .date-header {
    display: flex;
    margin-bottom: 10px;
  }

  .course-grid {
    display: grid;
  }
`
