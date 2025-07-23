import styled from 'styled-components'
import main_bg from '@/assets/img/main_bg.png'

export const RecommendWrapper = styled.div`
  .content {
    display: flex;
    justify-content: space-between;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background-image: url(${main_bg});
    width: 980px;
    margin: 0 auto;
    .left {
      width: 730px;
      overflow: hidden;
      .hotRecommend {
        width: 690px;
        padding-left: 20px;

        .itemcontent {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 20px 2px;
          .items {
            margin-bottom: 90px;
            position: relative;
            cursor: pointer;

            .desc {
              margin-top: 8px;
              /* height: 40px; */
              width: 140px;
              position: absolute;
              font-size: 14px;
              color: #000;
              line-height: 20px;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
`
