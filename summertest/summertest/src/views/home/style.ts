import styled from 'styled-components'
import content_bg from '@/assets/img/contents_bg.jpg'
import bottom_bg from '@/assets/img/bottom_bg.jpg'

export const HomeWrapper = styled.div`
  position: relative;
  width: 414px;
  height: 896px;
  background-color: rgb(242, 243, 248);
  background-image: url(${content_bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  .bottom {
    position: absolute;
    bottom: 0;
    width: 414px;
    height: 130px;
    border-top-left-radius: 23px;
    border-top-right-radius: 23px;
    background-image: url(${bottom_bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: height 0.5s ease;
    z-index: 9;
  }
  .Courses {
    position: absolute;
    bottom: 0;
    width: 414px;
    height: 840px;
    overflow: hidden;
    transition: height 0.5s ease;
    .foldbutton {
      position: absolute;
      top: 8px;
      right: 190px;
      width: 44px;
      height: 6px;
      background-color: rgb(223, 239, 252);
      border-radius: 3px;
      z-index: 99;
    }
  }
`
