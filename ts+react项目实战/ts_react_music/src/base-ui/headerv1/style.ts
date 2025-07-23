import styled from 'styled-components'
import main_sprite from '@/assets/img/main_sprite.png'

export const HeaderV1Wrapper = styled.div`
  display: block;
  position: relative;
  padding-top: 15px;
  border-bottom: 2px solid #c10d0c;
  width: 690px;
  .icon {
    height: 35px;
    width: 35px;
    background: url(${main_sprite}) no-repeat -225px -156px;
  }
  h2 {
    position: absolute;
    top: 13px;
    left: 32px;
    font-size: 20px;
    font-weight: normal;
    color: #333;
  }
  .hotrecommendnav {
    position: absolute;
    top: 13px;
    left: 130px;
    a {
      font-size: 12px;
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
    .line {
      margin: 0 12px;
      display: inline-block;
      font-size: 11px;
      color: #999;
    }
  }
  .right {
    position: absolute;
    top: 13px;
    right: 0;
    a {
      position: absolute;
      font-size: 12px;
      top: 1px;
      color: #666;
      width: 30px;
      right: 25px;
      &:hover {
        text-decoration: underline;
      }
    }
    .righticon {
      position: absolute;
      width: 12px;
      height: 12px;
      top: 11px;
      right: 15px;
      bottom: 8px;
      background: url(${main_sprite}) no-repeat 0 -240px;
    }
  }
`
