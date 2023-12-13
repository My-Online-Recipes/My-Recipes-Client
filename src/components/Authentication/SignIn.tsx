import React, { useEffect, useRef } from "react";
import {
  ButtonStyled, ImageTitle, ImageTwoLines, MostPopularRecipesTitleStyled,
  VideoElement
} from "../../style/SignInComponent.styled";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { auth } from "../../firebase/firebase";
import { registerUserAndGetAllRecipes } from "../../functions/registerDB.Queries";
import { getUserProfile } from "../../redux/selectors/user.selector";
import RecipesList from "../Recipes/RecipesList";
import { getPublicRecipe } from "../../redux/selectors/publicRecipes.selector";
import { PagesRoutes } from "../../utils/constants";
import { fetchRecipesLogIn } from "../../functions/recipesDB.Queries";
import { ShowMoreButtonStyled } from "../../style/RcipesCatalogPage.styled";
import Button from "@mui/material/Button";

export const SignInComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {state} = location;

  const userProfile = useSelector(getUserProfile);
  const publicRecipes = useSelector(getPublicRecipe);
  const shouldNotFetchRecipes = state && state.shouldNotFetchRecipes;
  const publicRecipesToShow = publicRecipes.publicRecipes;
  const totalPublicRecipes = publicRecipes.totalRecipeCount;
  const currentPage = publicRecipes.currentPage;
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      const res = await auth.signInWithPopup(provider)
      const user = res.user._delegate;
      registerUserAndGetAllRecipes(user)
        .then((returnData) => {
          if (returnData.isNewUser) {
            dispatch({type: 'SIGNUP', payload: returnData.userMetaData})
          } else {
            dispatch({type: 'LOGIN', payload: returnData.userMetaData})
            dispatch({
              type: 'SET_PRIVATE_RECIPES_FROM_DB',
              payload: {
                recipesFromDB: returnData.recipesFromDB,
                totalPrivateRecipeCount: returnData.totalPrivateRecipeCount,
              }
            })
            dispatch({
              type: 'SET_USER_RECIPE_LINKS',
              payload: {
                userRecipeLinks: returnData.userRecipeLinks
              }
            })
          }
          navigate('/myRecipesCatalog');
        })
    } catch (e) {
      console.log("Error: " + e)
    }
  }

  useEffect(() => {
    if (state && state.shouldNotFetchRecipes){
      state.shouldNotFetchRecipes = false;
    }
    fetchRecipes()
  }, [])

  //
  const fetchRecipes = async (showMore?: boolean) => {
    if (showMore) {
      await fetchRecipesLogIn(dispatch, currentPage + 1)
      return
    }
    if (!shouldNotFetchRecipes) {
      {
        dispatch({
          type: 'REMOVE_PUBLIC_RECIPES_FROM_STATE',
        })
        await fetchRecipesLogIn(dispatch, 1)
      }

    }
}
    return (
      <div style={ {display: "grid"} }>
        <VideoElement
          autoPlay
          ref={ videoRef }
          onEnded={ handleVideoEnded }
        >
          <source
            src="https://my-recipes-global-images.s3.amazonaws.com/file.mp4cd6c58d6-cb2b-4edc-ab5b-85d2869b58b1%7D"/>
        </VideoElement>

        <ImageTitle>CREATE YOUR OWN <br/>ONLINE RECIPE BOOK
          <br/>
          <br/>
          <ImageTwoLines/>
        </ImageTitle>

        <div>
          <MostPopularRecipesTitleStyled>
            Most Popular Recipes:
          </MostPopularRecipesTitleStyled>
          <div>
            { publicRecipesToShow &&
                <RecipesList recipes={ publicRecipesToShow } pageToGoBackWhileClickOnRecipe={ PagesRoutes.Home }/>
            }
            { publicRecipesToShow && (publicRecipesToShow.length < totalPublicRecipes) ?
              <ShowMoreButtonStyled>
                <Button onClick={ () => fetchRecipes(true) }>
                  Show more
                </Button>
              </ShowMoreButtonStyled>
              : '' }
          </div>
        </div>
        { !userProfile.name && <ButtonStyled onClick={ signInWithGoogle }>Log In</ButtonStyled> }
      </div>
    )
  }

  export default SignInComponent;
