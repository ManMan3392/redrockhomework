import styled from "styled-components";

export const DetailWrapper = styled.div`
  .course-detail {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;
  }

  .course-detail h3 {
    margin-top: 0;
    color: #202124;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }

  .detail-item {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .detail-item span:first-child {
    font-weight: 500;
    color: #5f6368;
    display: inline-block;
    width: 70px;
  }
  .schedule-content {
    margin-top: 20px;
  }

  .date-header {
    display: flex;
    margin-bottom: 10px;
  }

  .course-grid {
    display: grid;
  }
`