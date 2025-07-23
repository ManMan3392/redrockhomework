import styled from 'styled-components'
import main_sprite from '@/assets/img/main_sprite.png'

export const LoginItemWrapper = styled.div`
  .vip {
    width: 250px;
    height: 90px;
    margin-top: 6px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .login {
    width: 250px;
    height: 126px;
    background: url(${main_sprite}) 0 0;
    .desc {
      font-size: 12px;
      color: #666;
      line-height: 22px;
      width: 205px;
      margin: 0 auto;
      padding: 16px 0;
    }
    .button {
      display: block;
      width: 100px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      color: #fff;
      margin: 0 auto;
      text-shadow: 0 1px 0 #8a060b;
      background: url(${main_sprite}) 0 -195px;
    }
  }
`
