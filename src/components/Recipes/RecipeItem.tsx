import React from "react";
import {
  ImageStyled,
  ImageWrapperStyled,
  RecipeItemWrapperStyled,
  RecipeName
} from "../../style/RecipesLinkItem.styled";
import { useNavigate } from 'react-router-dom';
import { IRecipe } from "../../utils/interfaces";
import imagePlaceholder from "../../assets/placeholderImage.webp";

interface Props {
  recipe: IRecipe
  pageToGoBackWhileClickOnRecipe: string
}

export const RecipeItem: React.FC<Props> = ({recipe, pageToGoBackWhileClickOnRecipe}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/recipePage', {state: {recipe, pageToGoBack: pageToGoBackWhileClickOnRecipe, shouldNotFetchRecipes: false }})
  };
  return (<>
      { recipe.recipeName && <RecipeItemWrapperStyled onClick={ handleClick }>
        { recipe.imagesByUrls && recipe.imagesByUrls.length ?
          <ImageWrapperStyled>
            <ImageStyled src={ recipe.imagesByUrls[0] }></ImageStyled>
          </ImageWrapperStyled> :
          <ImageWrapperStyled>
            <ImageStyled src={ imagePlaceholder }></ImageStyled>
          </ImageWrapperStyled> }
          <RecipeName>
            { recipe.recipeName }
          </RecipeName>
      </RecipeItemWrapperStyled> }
    </>

  )
}

export default RecipeItem;
