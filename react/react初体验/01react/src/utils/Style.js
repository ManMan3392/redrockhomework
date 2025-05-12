import styled from "styled-components";

export const SectionWrapper = styled.div`
  .father {
    height: 500px;
    width: 500px;
    background-color: skyblue;
    color: ${(props) => props.$themecolor}; 
  }

  .son {
    height: 250px;
    width: 250px;
    background-color: pink;
    color: ${(props) => props.$themecolor}; 
  }

  .daughter {
    height: 250px;
    width: 250px;
    background-color: yellow;
    color: ${(props) => props.$themecolor};
  }
`;