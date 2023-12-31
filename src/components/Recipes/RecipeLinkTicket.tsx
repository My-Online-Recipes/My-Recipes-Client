import React from "react";

import { IRecipeLink } from "../Pages/MyLinkdPage";
import {
  CircleNumberStyled, RecipeInfoRightSideWrapper, RecipeInfoWrapper, RecipeLinkNameStyled,
  RecipeLinkTicketWrapperStyled,
  RecipeNumberStyled, RecipeUrlLinkWrapperStyled
} from "../../style/RecipeLinkTicket.styled";
import { ShowMoreButtonStyled } from "../../style/SignInComponent.styled";


interface Props {
  recipeLink: IRecipeLink
  index: number,
  colorIndex: number
}

export const RecipeLinkTicket: React.FC<Props> = ({recipeLink, index, colorIndex}) => {

  return (
    <RecipeLinkTicketWrapperStyled >
      <CircleNumberStyled>
        <RecipeNumberStyled>{ index }</RecipeNumberStyled>
      </CircleNumberStyled>
      {recipeLink && <RecipeInfoRightSideWrapper colorIndex={colorIndex}>
          <RecipeInfoWrapper>
            <RecipeLinkNameStyled>
              {recipeLink.recipeLinkName }
            </RecipeLinkNameStyled>
            <div>
              {recipeLink.recipeLinkDescription }
            </div>
          </RecipeInfoWrapper>
          <RecipeUrlLinkWrapperStyled>
            <a href={recipeLink.recipeLinkUrl } target="_blank" rel="noopener noreferrer">
              <ShowMoreButtonStyled>Open Link</ShowMoreButtonStyled>
            </a>
          </RecipeUrlLinkWrapperStyled>
      </RecipeInfoRightSideWrapper>}
    </RecipeLinkTicketWrapperStyled>
  )
}

export default RecipeLinkTicket;

