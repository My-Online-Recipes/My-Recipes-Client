import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";


export const RecipeCardWrapperStyled = styled.div`
  margin: 60px 260px 24px 260px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid rgb(185, 191, 200);

  @media ${ DEVICE.mobileL } {
    margin: unset;
  }
`;

export const RecipeImageAndIngredientWrapperStyled = styled.div`
  display: flex;
  height: 500px;
  background-color: rgb(239, 234, 230);
  border-radius: 8px 8px 0 0 ;
  
  @media ${ DEVICE.mobileL } {
    display: grid;
    height: unset;
  }
`;
export const HeaderContentStyled = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-self: center;
  justify-content: center;
`;

export const RecipeTopRightDataWrapperStyle = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex: 1;
  overflow: auto;
`

export const ImageContainer = styled.div`
  width: 50%;
  height: 500px;
  overflow: hidden;
  border-radius: 8px 0 0 0;

  @media ${ DEVICE.mobileL } {
    width: 100%
  }
`;

export const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RecipeNameStyled = styled.div`
  font-size: 50px;
  font-family: cursive;
`;

export const ServingsAndTimeToMakeStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const KnifeForkIconStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const SeparatorStyled = styled.div`
  border: 1px solid black;
  margin: 10px 90px 10px 90px;
`;

export const NotesStyled = styled.div`
  height: auto;
  padding: 8px;
  margin: 32px;
  border: 1px solid black;
  text-align: start;
`;
export const NotesTitleStyled = styled.div`
  font-size: 24px;
  padding: 0 0 8px 0;
`;

export const IngredientsStyled = styled.div`
  display: flex;
  flex-direction: column;
`;


export const ProcedureAndNotesContentWrapperStyled = styled.div`
  width: 100%;
  position: relative;
`;
export const ProcedureWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  width: 100%;
  @media ${ DEVICE.mobileL } {
    background-color: rgb(239, 234, 230);

  }
`;

export const HeaderWrapperStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;


export const GoBackButtonStyled = styled.button`
  padding: 8px;
  background-color: rgb(243, 242, 243);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: antiquewhite;
  }
`;


