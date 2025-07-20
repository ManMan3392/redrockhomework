import styled from 'styled-components'
import cover_sprite from '@/assets/img/cover_sprite.png'
import icon_sprite from '@/assets/img/icon_sprite.png'
export const ItemWrapper = styled.div`
  margin-bottom: 30px;
  position: relative;
  .cover1 {
    height: 140px;
    width: 140px;
    .cover2 {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url(${cover_sprite});
      background-position: 0 -537px;
      height: 27px;
      width: 140px;
      font-size: 12px;
      color: #ccc;
      .listener {
        position: absolute;
        top: 9px;
        left: 10px;
        background: url(${icon_sprite}) 0px -24px;
        width: 14px;
        height: 11px;
      }
      .listenCount {
        font-size: 12px;
        color: #ccc;
        margin-left: 28px;
        line-height: 27px;
      }
      .playIcon {
        position: absolute;
        top: 6px;
        right: 10px;
        background: url(${icon_sprite});
        width: 16px;
        height: 17px;
      }
    }
  }

  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${cover_sprite});
  background-position: 0 -537px; */
`
