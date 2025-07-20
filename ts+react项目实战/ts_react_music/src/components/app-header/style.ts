import styled from 'styled-components'
import topbar_sprite from '@/assets/img/topbar_sprite.png'
export const HeaderWrapper = styled.div`
  background-color: #242424;
  .content {
    display: flex;
    height: 70px;
    justify-content: space-between;
  }
  .headerbottom {
    height: 5px;
    background-color: #c20c0c;
  }
`
export const HeaderLeft = styled.div`
  display: flex;

  .logo {
    height: 70px;
    width: 177px;
    background: url(${topbar_sprite}) no-repeat;
  }
  .navbar {
    display: flex;
    position: relative;

    a {
      display: block;
      position: relative;
      text-align: center;
      line-height: 70px;
      padding: 0 20px;
      font-size: 14px;
      color: #ccc;
      &:hover {
        color: #fff;
        background-color: #000;
      }
    }
    .active {
      color: #fff;
      background-color: #000;
      &::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 7px;
        bottom: -1px;
        left: 0;
        right: 0;
        margin: 0 auto;
        background: url(${topbar_sprite}) -226px 0;
      }
    }
    .navbarhot {
      position: absolute;
      right: -18px;
      top: 14px;
      background-color: #fff;
      height: 15px;
      width: 30px;
      background: url(${topbar_sprite}) no-repeat -190px 0;
    }
  }
`
export const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  font-size: 12px;
  input.ant-input.css-dev-only-do-not-override-16dneet.ant-input-borderless {
    font-size: 12px;
    margin-left: -20px;
    width: auto;
  }
  svg {
    color: #ccc;
    font-size: 18px;
  }
  .search {
    padding-top: 3px;
    width: 158px;
    height: 32px;
    border-radius: 16px;
    background-color: #fff;
    font-size: 12px;
  }
  .headercreater {
    width: 90px;
    height: 32px;
    margin: 0 20px;
    line-height: 31px;
    color: #ccc;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #4f4f4f;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      color: #fff;
      border-color: #fff;
    }
  }
  .headerlogin a {
    color: #787878;
    &:hover {
      color: #575757ff;
      text-decoration: underline;
    }
  }
`
