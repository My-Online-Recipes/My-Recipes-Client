import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";


export const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;export const ImageWrapperStyled = styled.div`
  height: 300px;
  width: 300px;

  @media ${DEVICE.mobileL} {
    width: 150px; /* Set the width and height to control the circle's size */
    height: 150px;
    overflow: hidden; /* Clip any content that goes beyond the circle's boundaries */
    border-radius: 50%; /* Make the container itself a circle */
    display: flex;
    justify-content: center;
    align-items: center;
    flex:1
  }
`;

export const RecipeName = styled.div`
  padding-right: 8px;
  align-self: center;
  padding: 10px;
  font-family: cursive;
  font-size: 26px;
  flex:1
`;

export const Loader = styled.div`
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;


export const RecipesListWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;
  background-color: #e4f8f4;
  @media ${ DEVICE.mobileL } {
    top: 92px;
    font-size: 12px;
    left: 10px;
  }
`;

export const RecipeItemWrapperStyled = styled.div`
  display: flex;
  width: 50%;
  padding: 8px 0;
  @media ${DEVICE.mobileL} {
    width: 100%;
  }
  
`;







