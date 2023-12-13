import styled from "@emotion/styled";


export const WrapperStyled = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  border: black solid 1px;
  border-radius: 8px;
  color: white;
  background: #cdffe0;
  padding: 9px
`;
export const IconWrapperStyled = styled.div`
  height: 30px;
  width: 30px;
  cursor: pointer;
  padding: 2px;

  :hover {
    fill: #f6664a;
    color: white;
  }

  .like-button:hover svg {
    fill: white; /* You can change the fill color of the SVG when hovering */
    background-color: #61dafb;

  }


`;