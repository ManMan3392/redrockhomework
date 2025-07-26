import styled from 'styled-components'
import content_bg from '@/assets/img/contents_bg.jpg'
import bottom_bg from '@/assets/img/bottom_bg.jpg'

export const HomeWrapper = styled.div`
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
  }
`
