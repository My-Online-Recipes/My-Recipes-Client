import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../../redux/selectors/user.selector";
import {
  getRecipes,
} from "../../functions/recipesDB.Queries";
import { getRecipesCards } from "../../redux/selectors/recipesCards.selector";
import { RecipesList } from "../Recipes/RecipesList";
import 'react-toastify/dist/ReactToastify.css';
import Banner from "./Banner";
import { getSearchPublicRecipe } from "../../redux/selectors/searchPublicRecipes.selector";
import { ShowMoreButtonStyled, WrapperCatalog } from "../../style/RcipesCatalogPage.styled";
import Button from "@mui/material/Button";
import { PAGE_SIZE, PagesRoutes } from "../../utils/constants";

interface Props {
}

export const RecipesCatalog: React.FC<Props> = () => {

  const dispatch = useDispatch();

  const userProfile = useSelector(getUserProfile);
  const recipesCards = useSelector(getRecipesCards);
  const searchPublicRecipesCards = useSelector(getSearchPublicRecipe);
  const searchedRecipes = searchPublicRecipesCards.publicRecipes
  const searchText = searchPublicRecipesCards.searchText
  const totalRecipeCount = recipesCards.totalRecipeCount
  const currentRecipePage = recipesCards.currentPage

  const [allTheRecipes, setAllTheRecipes] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (recipesCards) {
      setAllTheRecipes(recipesCards.userRecipes);
    }
  }, [recipesCards, searchedRecipes])


  const handleShowMoreRecipesByPagination = () => {

    getRecipes(userProfile._id, currentRecipePage + 1, PAGE_SIZE).then((newRecipes) => {
      dispatch({type: 'SET_RECIPES', payload: newRecipes.recipes});
      dispatch({type: 'INCREMENT_RECIPE_PAGE', payload: currentRecipePage});
    })
  }
  return (
    <WrapperCatalog>
      <Banner searchQuery={ searchQuery } setSearchQuery={ setSearchQuery } />
      { searchText.length === 0 && allTheRecipes && <RecipesList recipes={ allTheRecipes } pageToGoBackWhileClickOnRecipe={PagesRoutes.MY_RECIPES_CATALOG}/> }
      { searchText.length !== 0 && <RecipesList recipes={ searchedRecipes } pageToGoBackWhileClickOnRecipe={PagesRoutes.MY_RECIPES_CATALOG}/> }
      { !searchQuery && allTheRecipes &&  (recipesCards.userRecipes.length < totalRecipeCount) ?
        <ShowMoreButtonStyled>
          <Button onClick={ handleShowMoreRecipesByPagination }>Show
            more
          </Button>
        </ShowMoreButtonStyled> : '' }
    </WrapperCatalog>
  )
}

export default RecipesCatalog;

