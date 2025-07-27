import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 394px;
  height: 48px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }

  .week-navigation {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .week-navigation button {
    padding: 6px 12px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .week-navigation button:hover:not(:disabled) {
    background-color: #e0e0e0;
  }

  .week-navigation button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .week-navigation h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }

  .back-to-today {
    padding: 6px 12px;
    height: 38px;
    width: 118px;
    background: linear-gradient(
      to right,
      rgb(78, 76, 236),
      rgba(125, 123, 226, 1)
    );
    color: white;
    border: none;
    border-radius: 19px;
    cursor: pointer;
    font-size: 15px;
    transition: background-color 0.2s;
  }

  .back-to-today:hover {
    background-color: #3367d6;
  }
`