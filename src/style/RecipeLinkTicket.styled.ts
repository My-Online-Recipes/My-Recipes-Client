import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { colors } from "../components/Pages/MyLinkdPage";
import { DEVICE } from "../utils/constants";

export const RecipeLinkTicketWrapperStyled = styled.div`
  display: flex;
  padding: 16px;
  gap: 32px;
  justify-content: center;
  @media ${ DEVICE.mobileL } {
    gap: 12px;
  }
`;
export const CircleNumberStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid black;
`;

export const RecipeNumberStyled = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
export const RecipeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 4px;
  padding-left: 12px;
`;
export const RecipeLinkNameStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-size:  30px;
  font-family: cursive;
  @media ${ DEVICE.mobileL } {
    font-size:  16px;
  }
`;
export const RecipeInfoRightSideWrapper = styled.div<{ colorIndex: number }>`
  width: 50vw;
  border-radius: 0 50px 50px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${ DEVICE.mobileL } {
    display: flex;
    width: 55vw;
    gap: 10px
  }
  
  background-color: ${ props => {
    return colors[props.colorIndex]
  } 

}

  
`;

export const RecipeUrlLinkWrapperStyled = styled.div`
  padding-right: 24px;
  @media ${ DEVICE.mobileL } {
    max-width: min-content;

  }
`;
export const ButtonStyled = styled(Button)`
  color: black;
  border: 1px solid black;: hover {
  background-color: aquamarine;
}
`;
