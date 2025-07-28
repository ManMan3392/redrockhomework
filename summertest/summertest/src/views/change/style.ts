import styled from 'styled-components'
import title_bg from '@/assets/img/title_bg.jpg'
import add_icon from '@/assets/img/add_icon.png'

export const ChangeWrapper = styled.div<{ isEntering: boolean }>`
  width: 414px;
  height: 896px;
  overflow: hidden;
  position: fixed;
  background-image: url(${title_bg});
  background-size: 100% 100%;
  transition: transform 0.3s ease-out;
  transform: ${(props) =>
    props.isEntering ? 'translateX(100%)' : 'translateX(0)'}; // 从右侧滑入
  .back {
    width: 30px;
    height: 30px;
    margin: 10px;
    position: absolute;
  }
  .hidden {
    width: 322px;
    padding-right: 42px;
    height: 100px;
    position: absolute;
    top: 191px;
    line-height: 50px;
    font-size: 38px;
    left: 16px;
    color: rgb(18, 44, 77);
    box-sizing: border-box;
    background: rgb(255, 255, 255);
    z-index: 99;
  }
  .lasttitle {
    display: flex;
    position: absolute;
    height: 30px;
    width: 100px;
    top: 164px;
    left: 16px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(51, 68, 92);
    transition: transform 0.1s ease-out;
  }
  .realtitle {
    position: absolute;
    height: 30px;
    width: 100px;
    font-weight: 400;
    color: rgb(51, 68, 92);
    z-index: 99;
    transition: all 0.3s ease-out;
  }
  .minitile {
    top: 164px;
    left: 68px;
    font-size: 16px;
  }
  .maxtitle {
    top: 247px;
    left: 15px;
    font-size: 37px;
  }
  .titlebg {
    width: 322px;
    padding-right: 42px;
    height: 100px;
    position: absolute;
    top: 191px;
    line-height: 50px;
    font-size: 38px;
    left: 16px;
    color: rgb(18, 44, 77);
    box-sizing: border-box;
    background: rgb(255, 255, 255);
    z-index: 9;
  }
  .input {
    width: 377px;
    height: 58px;
    border-radius: 29px;
    position: absolute;
    top: 313px;
    padding-left: 20px;
    left: 19px;
    box-sizing: border-box;
    border: none;
    background: transparent;
    outline: none;
    font-size: 25px;
    line-height: 58px;
    color: rgb(47, 67, 93);
  }
  .warming {
    position: absolute;
    width: 254px;
    height: 40px;
    box-sizing: border-box;
    top: 203px;
    border-radius: 20px;
    line-height: 40px;
    padding: 0px 36px;
    left: 76px;
    background-color: rgb(43, 78, 132);
    font-size: 16px;
    color: rgb(233, 243, 251);
    transition: all 0.1s ease;
  }
  .bg {
    width: 364px;
    height: 79px;
    position: absolute;
    top: 378px;
    left: 16px;
    box-sizing: border-box;
    background: rgb(255, 255, 255);
  }
  .choice {
    width: 360px;
    height: 71px;
    position: absolute;
    top: 384px;
    left: 20px;
    box-sizing: border-box;
    background: transparent;
    color: rgb(47, 67, 93);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    z-index: 1;
    .choice-item {
      width: 70px;
      height: 30px;
      border-radius: 15px;
      box-sizing: border-box;
      font-size: 14px;
      padding: 5px 19px;
      color: rgb(144, 156, 173);
      font-weight: 500;
      background-color: rgb(241, 245, 255);
    }
  }
  .next {
    width: 75px;
    height: 75px;
    position: absolute;
    bottom: 114px;
    left: 169px;
  }
  .choice {
    /* 已有样式保持不变 */
    transition: transform 0.1s ease-out;
  }

  .slide-out {
    transform: translateX(414px);
  }
  .items {
    width: 360px;
    position: absolute;
    top: 393px;
    left: 20px;
    box-sizing: border-box;
    color: rgb(47, 67, 93);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    z-index: 99;
    flex-direction: column;
    transition: transform 0.1s ease-out;

    .item {
      width: 72px;
      height: 37px;
      border-radius: 20px;
      line-height: 37px;
      background-color: rgb(239, 245, 252);
      text-align: center;
      font-size: 15px;
      color: rgb(66, 79, 101);
      font-weight: 500;
      margin-bottom: 10px;
    }
    .section {
      display: flex;
      flex-wrap: wrap;
      .add {
        height: 41px;
        width: 32px;
        background: url(${add_icon}) center;
        transition: all 0.3s ease-out;
      }
      .time {
        height: 37px;
        border-radius: 20px;
        line-height: 37px;
        background-color: rgb(239, 245, 252);
        text-align: center;
        font-size: 15px;
        color: rgb(66, 79, 101);
        font-weight: 500;
        font-size: 13px;
        margin-right: 10px;
        padding: 0 15px;
        margin-bottom: 10px;
      }
    }
    .todo {
      width: 90px;
    }
  }
`
