import styled from 'styled-components'

export const DiscoverWrapper = styled.div`
  height: 30px;
  line-height: 30px;
  background-color: #c20c0c;
  box-sizing: border-box;
  border-bottom: 1px solid #a40011;
  .nav {
    display: flex;
    align-items: center;
    margin-left: 355px;
    .navitem {
      margin-top: -4px;
      a {
        margin: 7px 17px;
        margin-top: 6px;
        padding: 1px 11px;
        height: 18px;
        line-height: 16px;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        display: block;
        &:hover {
          background-color: rgba(44, 43, 43, 0.2);
        }
      }
      .active {
        background-color: rgba(44, 43, 43, 0.2);
      }
    }
  }
`
