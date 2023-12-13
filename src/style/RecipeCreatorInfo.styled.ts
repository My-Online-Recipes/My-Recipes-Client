import styled from "@emotion/styled";

export const RecipeCreatorInfoWrapperStyled = styled.div`

  width: 100%;
  background-color: rgb(27, 27, 27);
  color: white;

  align-items: center;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
`;

export const InfoWrapperStyled = styled.div`

  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
  align-items: center;
`;

export const ImageWrapperStyled = styled.div<{imageUrl: string}>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 8px;
  border: 1px solid white;
`;
