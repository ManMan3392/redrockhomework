import styled from "styled-components";

export const DetailWrapper = styled.div`
  border-top-left-radius: 23px;
  border-top-right-radius: 23px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 314px;
  border: 1px solid #e0e0e0;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 10px 20px rgba(114, 178, 241, 0.8);
  color: rgb(22, 59, 109);
  z-index: 99;
  transition: all 0.5s ease;
  .course-detail {
    margin: 18px;
    width: 378px;
  }

  .course-detail h3 {
    font-size: 25px;
    color: rgb(22, 59, 109);
    padding-bottom: 8px;
  }

  .detail-item {
    margin-bottom: 16px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
  .detail-item1 {
    display: flex;
    justify-content: flex-start;
    font-weight: 500;
  }
  .position {
    display: block;
    position: relative;
    width: 90px;
    height: 20px;
    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      top: 12px;
      right: -px;
      width: 6px;
      height: 6px;
      border-top: 1px solid #666;
      border-right: 1px solid #666;
      transform: rotate(45deg);
      margin-left: 5px;
    }
  }
  .date {
    margin-left: 10px;
  }
  .detail-item2 {
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
  }
  .weightcontent {
    font-weight: 600;
  }
` 