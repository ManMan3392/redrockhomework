import styled from 'styled-components'
import main_bg from '@/assets/img/main_bg.png'
import main_sprite from '@/assets/img/main_sprite.png'
import cover_sprite from '@/assets/img/cover_sprite.png'

export const NewAlbumWrapper = styled.div`
  padding-left: 20px;
  width: 980px;
  margin: 0 auto;
  background-image: url(${main_bg});
  .newAlbumbanner {
    position: relative;
    width: 673px;
    height: 186px;
    padding-left: 24px;
    background: #f5f5f5;
    border: 1px solid #d3d3d3;
    margin: 20px 0 37px;
    overflow: hidden;
    .newAlbum {
      display: flex !important;
      justify-content: space-between !important;
      width: 645px !important;
      padding: 20px 2px;
      height: 184px;
      .newAlbunItem {
        width: 118px;
        height: 150px;
        background: url(${main_sprite}) no-repeat -260px 100px;
        .title {
          color: #333;
          margin-top: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .aritist {
          color: #666;
          margin-top: -1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .msk {
        position: absolute;
        top: 0;
        left: 0;
        width: 118px;
        height: 100px;
        background: url(${cover_sprite}) 0 -570px;
      }
    }
    .leftArrow {
      position: absolute;
      left: 4px;
      top: 63px;
      width: 17px;
      height: 17px;
      background: url(${main_sprite}) -260px -75px;
      cursor: pointer;
    }
    .rightArrow {
      position: absolute;
      top: 63px;
      right: 4px;
      width: 17px;
      height: 17px;
      background: url(${main_sprite}) -300px -75px;
      cursor: pointer;
    }
  }
`
