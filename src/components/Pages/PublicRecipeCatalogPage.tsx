import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../../redux/selectors/user.selector";
import {
  getRecipes,
  insertNewRecipesToDB,
  sendImageByImageToS3
} from "../../functions/recipesDB.Queries";
import { getRecipesCards } from "../../redux/selectors/recipesCards.selector";
import { RecipesList } from "../Recipes/RecipesList";
import { IRecipe } from "../../utils/interfaces";
import 'react-toastify/dist/ReactToastify.css';
import { getSearchPublicRecipe } from "../../redux/selectors/searchPublicRecipes.selector";
import { ShowMoreButtonStyled, WrapperCatalog } from "../../style/RcipesCatalogPage.styled";
import Button from "@mui/material/Button";
import { PAGE_SIZE, PagesRoutes } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import PublicBanner from "./PublicBanner";

interface Props {
}

export const PublicRecipeCatalogPage: React.FC<Props> = () => {
  const location = useLocation();
  const { state } = location;
  const [userData, setUserData] = useState<any>(state ? state.userData : null)


  const recipesCards = useSelector(getRecipesCards);
  const searchPublicRecipesCards = useSelector(getSearchPublicRecipe);
  const searchedRecipes = searchPublicRecipesCards.publicRecipes
  // const searchText = searchPublicRecipesCards.searchText

  const [publicRecipes, setPublicRecipes] = useState<any>(null)
  const [totalRecipeCount, setTotalRecipeCount] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRecipePage, setCurrentRecipePage] = useState<number>(0);



  useEffect(() => {
    if (recipesCards) {
      getRecipes(userData._id, 1, PAGE_SIZE).then((newRecipes) => {
        setPublicRecipes(newRecipes.recipes);
        setTotalRecipeCount(newRecipes.totalRecipeCount)
        setCurrentRecipePage(currentRecipePage + 1)
      })
    }
  }, [])

  const handleShowMoreRecipesByPagination = () => {

    getRecipes(userData._id, currentRecipePage + 1, PAGE_SIZE).then((newRecipes) => {
      const newRecipe = [...publicRecipes, ...newRecipes.recipes]
      setPublicRecipes(newRecipe);
      setCurrentRecipePage(currentRecipePage + 1)
    })
  }
  console.log("searchQuery",searchQuery )
  return (
    <WrapperCatalog>
      <PublicBanner searchQuery={ searchQuery } setSearchQuery={ setSearchQuery } publicUserData={userData}/>
      { searchQuery.length == 0 && publicRecipes && <RecipesList recipes={ publicRecipes } pageToGoBackWhileClickOnRecipe={PagesRoutes.PUBLIC_RECIPES_CATALOG}/> }
      { searchQuery.length !== 0 && <RecipesList recipes={ searchPublicRecipesCards.publicRecipes } pageToGoBackWhileClickOnRecipe={PagesRoutes.PUBLIC_RECIPES_CATALOG}/> }

      { publicRecipes &&  (publicRecipes.length < totalRecipeCount) ?
        <ShowMoreButtonStyled>
          <Button onClick={ handleShowMoreRecipesByPagination }>Show
            more
          </Button>
        </ShowMoreButtonStyled> : '' }
    </WrapperCatalog>
  )
}

export default PublicRecipeCatalogPage;

