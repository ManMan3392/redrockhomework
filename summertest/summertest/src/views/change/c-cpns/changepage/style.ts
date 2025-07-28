import styled from 'styled-components'

export const ChangePageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 380px;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  z-index: 99;
  box-shadow: 0 -9px 20px 6px rgba(109, 132, 234, 0.1);
  transition: all 0.5s ease;
  .choose {
    display: flex;
    justify-content: space-evenly;
    .msk {
      position: absolute;
      top: 0px;
      left: 0;
      right: 0;
      bottom: 336px;
      z-index: 99;
      box-shadow: inset 0 20px 20px 20px rgba(255, 255, 255, 0.8);
    }
    .msk2 {
      position: absolute;
      left: 0;
      right: 0;
      height: 31px;
      bottom: 107px;
      z-index: 999;
      box-shadow: 0px -20px 20px 8px rgba(255, 255, 255, 0.8);
    }
    .border {
      position: absolute;
      top: 96px;
      left: 0;
      right: 0;
      height: 52px;
      width: 100%;
      z-index: 99;
      background-color: transparent;
      border-block: 1px solid rgb(45, 135, 245);
    }
  }
  .button {
    box-sizing: border-box;
    position: absolute;
    bottom: 45px;
    left: 150px;
    padding: 11px 45px;
    height: 46px;
    width: 132px;
    background: linear-gradient(to right, rgb(46, 38, 213), rgb(90, 88, 244));
    color: white;
    border: none;
    border-radius: 23px;
    cursor: pointer;
    font-size: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
