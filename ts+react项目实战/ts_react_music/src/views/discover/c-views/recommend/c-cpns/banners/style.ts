import styled from 'styled-components'
import download from '@/assets/img/download.png'
import banner_sprite from '@/assets/img/banner_sprite.png'

export const BannersWrapper = styled.div`
  height: 270.37px;
  .bannercontent {
    margin: 0 auto;
    position: relative;
    width: 984px;
    display: flex;
    .rightarrow {
      right: -70px;
      background-position: 0 -508px;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 37px;
      height: 63px;
      margin: auto 0;
      background-image: url(${banner_sprite});
      cursor: pointer;
    }
    .leftarrow {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 37px;
      height: 63px;
      margin: auto 0;
      background-image: url(${banner_sprite});
      left: -70px;
      background-position: 0 -360px;
      cursor: pointer;
    }
  }
  .banner {
    width: 730px;
    height: 285px;

    :where(.css-dev-only-do-not-override-1mld5ug).ant-carousel
      .slick-dots
      li
      button {
      opacity: 0.7 !important;
    }
    :where(.css-dev-only-do-not-override-1mld5ug).ant-carousel
      .slick-dots
      li::after {
      background: #c20c0c !important;
    }
  }
  .download {
    display: block;
    width: 254px;
    height: 270.37px;
    background: url(${download});
    box-shadow: 10px 0 20px -5px rgba(0, 0, 0, 0.5);
  }
`
