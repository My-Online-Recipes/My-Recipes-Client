import React from "react";
import { IRecipe } from "../../utils/interfaces";
import { insertNewRecipesToDB, sendImageByImageToS3 } from "../../functions/recipesDB.Queries";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/selectors/user.selector";
import AddNewRecipesComponent from "../Recipes/AddNewRecipes";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils/common";



export const CreateNewRecipePage: React.FC = () => {

  const userProfile = useSelector(getUserProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSaveRecipe = async (recipe: IRecipe) => {
    let imagesByUrls: Array<string> = []
    if (recipe.images) {
      imagesByUrls = await sendImageByImageToS3(recipe.images);
    }
    delete recipe.images;
    const recipeWithUrlImages = {...recipe, imagesByUrls: imagesByUrls, userId: userProfile._id, _id: ''}

    try {
      const res = await insertNewRecipesToDB(recipeWithUrlImages)
      const newRecipeToSaveInState: IRecipe = {...recipeWithUrlImages, _id: res._id}
      // TODO: think: sould i save the time stemp also in state?
      dispatch({type: 'SET_RECIPE', payload: newRecipeToSaveInState});
      successToast("New Recipe Created Successfully")
      navigate('/myRecipesCatalog');

    } catch (e: any) {
      console.log("cannot create new recipe", e)
      errorToast("Cannot Create New Recipe Now...")
    }
  };
  return (
      <AddNewRecipesComponent onSave={ handleSaveRecipe } />
  )
}

export default CreateNewRecipePage;
