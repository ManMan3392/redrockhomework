import styled from 'styled-components'

export const TableWrapper = styled.div`
  .course-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1px; // 行间隔1px
    margin-bottom: 20px;
  }

  .course-table th,
  .course-table td {
    width: 40px;
    height: 55px;
    font-size: 14px;
    text-align: center;
    background: #fff;
    border: none;
    padding: 0;
  }

  .courseitem {
    height: 110px !important; // 一节课占两个格子
    min-width: 40px;
    max-width: 40px;
    padding: 0;
    overflow: hidden; // 防止内容溢出
    position: relative;
    background: #fff;
  }

  .course-table tr {
    background: #fff;
  }

  .course-table th {
    background-color: #f1f3f4;
    font-weight: 600;
    text-align: center;
  }

  .section-cell {
    width: 29px !important;
  }
  .courseitem {
    height: 105px !important;
  }
  .has-courses {
    vertical-align: top;
  }

  .course-info {
    background-color: #e8f0fe;
    border-radius: 8px;
    padding: 5px;
    width: 47px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .course-info:hover {
    background-color: #d2e3fc;
  }
  .course-info.section-1,
  .course-info.section-3 {
    background-color: rgb(249, 232, 217);
    color: rgb(232, 144, 74);
  }

  .course-info.section-5,
  .course-info.section-7 {
    background-color: rgb(248, 228, 227);
    color: rgb(230, 149, 152);
  }

  .course-info.section-9,
  .course-info.section-11 {
    background-color: rgb(221, 228, 248);
    color: rgb(121, 131, 205);
  }
  .course-name,
  .course-place {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .course-name {
    font-weight: 500;
    margin-bottom: 14px;
  }
`
