import React from "react";
import RecipeItem from "./RecipeItem";
import { RecipesListWrapperStyled } from "../../style/RecipesLinkItem.styled";
import { IRecipe } from "../../utils/interfaces";

interface Props {
  recipes: IRecipe[]
  pageToGoBackWhileClickOnRecipe: string
}

export const RecipesList: React.FC<Props> = ({recipes, pageToGoBackWhileClickOnRecipe}) => {
  return (
    <RecipesListWrapperStyled>
      {  recipes.map((recipe: any, index: number) => {
        return (
            <RecipeItem key={ index } recipe={ recipe } pageToGoBackWhileClickOnRecipe={pageToGoBackWhileClickOnRecipe}/>
          )
      })}
    </RecipesListWrapperStyled>
  )
}

export default RecipesList;
