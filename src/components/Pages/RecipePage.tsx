import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  GoBackButtonStyled,
  ImageContainer,
  ImageStyled, IngredientsStyled,
  KnifeForkIconStyled,
  ProcedureAndNotesContentWrapperStyled, NotesStyled, NotesTitleStyled, ProcedureWrapperStyled,
  RecipeCardWrapperStyled, RecipeImageAndIngredientWrapperStyled,
  RecipeNameStyled,
  RecipeTopRightDataWrapperStyle,
  SeparatorStyled,
  ServingsAndTimeToMakeStyled
} from "../../style/RecipeCard.styled";
import { ReactComponent as KnifeForkIcon } from "../../assets/fork-and-knife-in-cross.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import imagePlaceholder from "../../assets/placeholderImage.webp";
import ShareRecipeComponent from "../Recipes/ShareRecipeComponent";
import { errorToast } from "../../utils/common";
import RecipeCreatorInfo from "../Recipes/RecipeCreatorInfo";
import { getRecipesById, incrementInteractionRecipeCount } from "../../functions/recipesDB.Queries";


export const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentURL = window.location.href;
  const urlObject = new URL(currentURL);
  const id = urlObject.searchParams.get("id");

  const {state} = location;
  const pageToGoBackWhileClickOnRecipe = state ? state.pageToGoBack : null
  const [recipe, setRecipe] = useState<any>(state ? state.recipe : null)
  const [userData, setUserData] = useState<any>(state ? state.recipe.recipeCreatorInfo : null)
  if (id) {
    // this use effect is for recipe link by id
      if (!recipe) {
        getRecipesById(id)
          .then(data => {
            if (data.error) {
              errorToast("This is a private recipe please log in first")
              navigate('/home')
            } else {
              setRecipe({...data.recipeById[0]})
              setUserData({...data.userData[0]})
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
  }
  const handleClick = () => {
    navigate(pageToGoBackWhileClickOnRecipe, {state: {shouldNotFetchRecipes: true}})
  };

  // increment the interaction with the current recipe for analytics (show the most view first)
  useEffect(() => {
    const fetchData = async () => {
      if (recipe && recipe._id) {
        try {
          return incrementInteractionRecipeCount(recipe._id)
        } catch (e: any) {
          console.log("error", e)
        }
      }
    }
    fetchData()
  }, [])


  return (<div>
      <RecipeCardWrapperStyled>
        <RecipeImageAndIngredientWrapperStyled>
          <ImageContainer>
            { recipe && (recipe.imagesByUrls[0] ? <ImageStyled src={ recipe.imagesByUrls[0] }/> :
              <ImageStyled src={ imagePlaceholder }/>) }
          </ImageContainer>
          <RecipeTopRightDataWrapperStyle>
            <RecipeNameStyled>
              { recipe && recipe.recipeName }
            </RecipeNameStyled>
            <ServingsAndTimeToMakeStyled>
              { recipe && recipe.servingsNumber && <KnifeForkIconStyled>
                  <KnifeForkIcon
                      style={ {
                        width: "30px",
                        height: "30px",
                        padding: "8px"
                      } }/> { recipe && recipe.servingsNumber } servings
              </KnifeForkIconStyled> }
              { recipe && recipe.timeToMake && <KnifeForkIconStyled>
                  <ClockIcon style={ {width: "30px", height: "30px", padding: "8px"} }/> { recipe.timeToMake }
              </KnifeForkIconStyled> }
            </ServingsAndTimeToMakeStyled>
            <SeparatorStyled/>
            <IngredientsStyled>
              <div style={ {fontSize: '30px', padding: "24px", fontFamily: "ui-monospace"} }>INGREDIENTS</div>
              <div style={ {overflowY: "auto"} }>{ recipe && recipe.ingredients.map((line: string, index: number) =>
                <div
                  style={ {padding: "4px"} }
                  key={ index }> { line }</div>) }</div>
            </IngredientsStyled>
          </RecipeTopRightDataWrapperStyle>
        </RecipeImageAndIngredientWrapperStyled>

        <ProcedureAndNotesContentWrapperStyled>
          <div style={ {display: "flex", justifyContent: "space-around"} }>

            <ProcedureWrapperStyled
              style={ {display: "flex", flexDirection: "column", padding: "32px", width: "100%"} }>
              <div style={ {
                fontSize: '30px',
                padding: "0 24px 24px 24px",
                fontFamily: "ui-monospace"
              } }>PROCEDURE
              </div>
              <div style={ {
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline"
              } }>{ recipe && recipe.procedure.map((line: string, index: number) =>
                <div key={ index } style={ {padding: "4px", textAlign: "start"} }>
                  { index + 1 }) { line.trim() }
                </div>) }
              </div>
            </ProcedureWrapperStyled>
          </div>

          { recipe && recipe.notes && <NotesStyled
              style={ {height: "auto", padding: "8px", textAlign: "start", backgroundColor: "rgb(239, 234, 230)"} }>
              <NotesTitleStyled>NOTES</NotesTitleStyled>
              <div style={{maxWidth: "75%"}}>{ recipe.notes }</div>
          </NotesStyled> }
          <ShareRecipeComponent recipe={ recipe }/>
        </ProcedureAndNotesContentWrapperStyled>
        {userData && <RecipeCreatorInfo userData={userData}/>}
      </RecipeCardWrapperStyled>
      {/*TODO: add remove icon with logic*/ }
      { pageToGoBackWhileClickOnRecipe && <GoBackButtonStyled onClick={ handleClick }>Go Back</GoBackButtonStyled> }
    </div>
  )
}


export default RecipePage;

