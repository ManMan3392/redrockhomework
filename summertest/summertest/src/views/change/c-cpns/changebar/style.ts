import styled from "styled-components";

export const ChangeBarWrapper = styled.div`
  .carousel-container {
    transform-style: preserve-3d;
    box-sizing: border-box;
    /* padding-left: 28px; */
    perspective: 1200px;
    position: relative;
    margin: 0 auto;
    height: 244px;
    width: 120px;
    overflow: hidden;

    .carousel-item {
      position: absolute;
      box-sizing: border-box;
      width: 120px;
      height: 63px; /* 使用配置中的BOX_HEIGHT */
      display: flex;
      align-items: center;
      justify-content: center;
      backface-visibility: hidden;
      background-color: rgb(255, 255, 255);
    }

    .selected {
      color: rgb(59, 144, 247);
    }

    .face-content {
      /* 确保文字在3D变换中保持清晰 */
      transform: translateZ(1px);
      font-size: 23px;
    }
  }
`
