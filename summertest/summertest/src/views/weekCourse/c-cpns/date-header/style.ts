import styled from "styled-components";

export const HeaderWrapper = styled.div`
width: 394px;
height: 54px;
  .month {
    text-align: center;
    font-weight: 500;
    padding-top: 15px;
    font-size: 16px;
    padding-left: 0px;
  }
  .days {
    display: flex;
  }

  .day-item {
    text-align: center;
    padding: 8px;
    font-weight: 500;
  }
  .miniday {
    color: rgb(173, 181, 187);
    margin-top: 10px;
  }
`