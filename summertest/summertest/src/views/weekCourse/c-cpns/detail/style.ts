import styled from "styled-components";

export const DetailWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 314px !important;
  width: 414px !important;
  z-index: 99;
  transition: all 0.5s ease;
  /* overflow: hidden; */
  /* box-shadow: 0px 0px 15px 0px rgba(114, 178, 241, 0.3); */
  .item-container {
    border-top-left-radius: 23px;
    border-top-right-radius: 23px;

    border: 1px solid #e0e0e0;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 20px rgba(114, 178, 241, 0.8);
    color: rgb(22, 59, 109);

    .msk {
      position: absolute;
      height: 600px;
      width: 414px;
      top: -500px;
      left: 0;
      right: 0;
    }
    .container {
      display: flex;
      width: 800px;
    }
    .buttons {
      position: absolute;
      display: flex;
      top: -3px;
      right: -11px;
      height: 50px;
      width: 180px;
      z-index: 99;
      .delete {
        height: 38px;
        width: 75px;
        background-color: rgb(232, 239, 249);
        margin-right: 15px;
        border-radius: 19px;
        font-size: 17px;
        line-height: 38px;
        text-align: center;
        color: rgb(143, 162, 198);
      }
      .change {
        background: linear-gradient(
          to right,
          rgb(78, 76, 236),
          rgba(125, 123, 226, 1)
        );
        color: rgb(255, 255, 255);
      }
    }
    .infos {
      box-sizing: border-box;
      display: flex;
      height: 250px;
      width: 100%;
      margin-top: 12px;
      flex-direction: column;
      .details-info {
        box-sizing: border-box;
        height: 20px;
        margin-bottom: 30px;
        width: 100%;
        font-size: 15px;
        color: rgb(70, 74, 93);
        font-weight: 500;
      }
      .detailcontent {
        width: 100%;
        font-size: 18px;
        color: rgb(40, 45, 58);
        font-weight: 400;
      }
    }
    .course-detail {
      margin: 18px;
      width: 378px;
      position: relative;
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
  }
  .carousel-indicators {
    position: absolute;
    height: 43px;
    width: 100%;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    span {
      width: 9px;
      height: 9px;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
      margin-right: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      &.active {
        background: rgb(116, 114, 228);
        width: 14px;
        border-radius: 4px;
      }
    }
  }
` 