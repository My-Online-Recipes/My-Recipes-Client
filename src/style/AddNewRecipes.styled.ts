import styled from "@emotion/styled";
import { css, keyframes } from "@mui/material";
import { DEVICE } from "../utils/constants";


export const RecipesInputsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  align-self: center;
  border-radius: 8px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.3);
  width: 50vw;
  padding: 8px;
  @media ${ DEVICE.mobileL } {
    width: unset;
  }
` ;
export const IngredientsAndProcessWrapperStyled = styled.div`
  display: flex;
  height: 220px;
  justify-content: space-between;
  @media ${ DEVICE.mobileL } {
    flex-direction: column;
    height: 400px;
  }
` ;


export const WrapperNewRecipeModalStyled = styled.div<{ show: any }>`
  ${ ({show}) =>
          show &&
          css`
            animation: ${ fadeAnimation } 0.5s;
            opacity: 1;
          ` }
`;

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CoverStyled = styled.div`
  color: white;
  display: -ms-flexbox;
  background-image: url(https://my-recipes-global-images.s3.amazonaws.com/recipeAppBannerImage1.jpeg);
  background-size: cover;
  padding: 190px 0px;
  border-radius: 8px;
`;

export const CreateNewRecipeContentWrapper = styled.div`
  height: 55.5vh;
`;
export const WrapperNewRecipeStyle = styled.div`
  background-color: #e4f8f4;

`;

export const PopupContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  background-color: white;


  @media ${ DEVICE.mobileL } {
    top: 73%
  }

`;

export const HeaderPopup = styled.div`
  display: flex;
  justify-content: space-between;
  padding:  12px;
`;

export const CloseButtonStyled = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgb(243, 242, 243);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: antiquewhite;
  }
`;

export const RemoveLineButtonStyled = styled(CloseButtonStyled)`
  width: 20px;
  height: 20px;
  margin-left: 6px;
`;



export const TitleStyled = styled.div`
  color: black;
  font-size: 30px;
  font-weight: bold;
  
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #000000;
  margin-bottom: 10px;
`;export const UploadImageWrapperStyled = styled.div`
  display: flex;
  gap: 8px;
  height: 44px;
  width: 100%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: pink;
`;


