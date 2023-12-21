import axios from "axios";
import { IRecipe } from "../utils/interfaces";
import { PAGE_SIZE } from "../utils/constants";
import { IRecipeLink } from "../components/Pages/MyLinkdPage";
import { getJWTFromLocalStorage } from "../utils/common";


export const getRecipes = async (userId: string, currentPage: number = 1, pageSize = PAGE_SIZE): Promise<any> => {
  try {
    //TODO: change the paganetion logic!
    //amir
    const res = await axios.get(`http://34.125.222.127:4000/recipe/getRecipes?userId=${ userId }&currentPage=${ currentPage }&pageSize=${ pageSize }`);
    return {
      recipes: extendRecipeWithUserInfo(res.data),
      totalRecipeCount: res.data.totalRecipeCount
    }
  } catch (e: any) {
    console.log("error", e)
  }
}


export const insertNewRecipesToDB = async (recipe: IRecipe) => {
  if (recipe) {
    try {
      const res = await axios.post(`http://34.125.222.127:4000/recipe/createNewRecipe`, {...recipe},{
        headers: {
          'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
        }
      });
      return res.data;
    } catch (e: any) {
      console.log("error", e)
    }
  }
}


export const sendImageByImageToS3 = async (images: File[]) => {
  if (!images) return [];
  const imagePromises = images.map((image) => insertNewImagesToDB(image));
  try {
    return await Promise.all(imagePromises);
  } catch (error) {
    console.log('Error processing assets', error);
    return [];
  }
};

export const insertNewImagesToDB = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(`http://34.125.222.127:4000/uploadImage`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
        }
      });
    return res.data.imagePath
  } catch (e) {
    console.log("Error from server...", e);
  }
}

export const getTotalNumberOfRecipesForPagination = async (userId: string) => {
  if (userId) {
    try {
      const res = await axios.get(`http://34.125.222.127:4000/recipe/countUserRecipes`, {
        params: {
          userId
        }
      });
      return res.data;
    } catch (e: any) {
      console.log("error", e)
    }
  }
}

export const getUserRecipeLinks = async (userId: string, currentPage: number = 1, pageSize: number = 20) => {
  if (userId) {
    try {
      const res = await axios.get(`http://34.125.222.127:4000/recipe/getUserRecipeLinks?userId=${ userId }&currentPage=${ currentPage }&pageSize=${ pageSize }`,
        {
          headers: {
            'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
          }
        })
      return res.data;
    } catch (e: any) {
      console.log("error", e)
    }
  }
}
export const setUserRecipeLink = async (recipeLink: IRecipeLink) => {
  if (recipeLink) {
    try {
      const res = await axios.post(`http://34.125.222.127:4000/recipe/setUserRecipeLink`, {...recipeLink},
        {
          headers: {
            'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
          }
        })
      return res.data;
    } catch (e: any) {
      console.log("error", e)
    }
  }
}

export const fetchRecipesLogIn = async (dispatch: any, currentPage: number = 1) => {
  const res = await axios.get(`http://34.125.222.127:4000/recipe/getRecipes`,
    {params: {currentPage: currentPage, pageSize: PAGE_SIZE, shouldGetTotalRecipesCount: true}})
  const recipeWithUserInfo = extendRecipeWithUserInfo(res.data)
  dispatch({
    type: 'SET_PUBLIC_RECIPES_FROM_DB',
    payload: {
      allPublicRecipesFromDB: recipeWithUserInfo,
      totalPublicRecipeCount: res.data.totalPublicRecipes,
      currentPage: currentPage
    }
  })
}

export const getRecipesById = async (recipeId: string): Promise<any> => {
  try {
    const res = await axios.get(`http://34.125.222.127:4000/recipe/getRecipes?id=${ recipeId }`);
    return res.data;
  } catch (e: any) {
    console.log("error", e)
  }
}
export const incrementInteractionRecipeCount = async (recipeId: string): Promise<any> => {
  try {
    return await axios.post(`http://34.125.222.127:4000/recipe/incrementInteractionRecipeCount`, {recipeId: recipeId},
      {
        headers: {
          'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
        }
      });
  } catch (e: any) {
    console.log("error", e)
  }
}


export const fetchSearchRequest = async (searchQuery: string, isPrivate: boolean, userProfileId: string, dispatch: any) => {
  const response = await axios.get(`http://34.125.222.127/recipe/searchRecipe`,
    {
      params: {
        searchQuery: searchQuery,
        isPrivate: isPrivate,
        _id: userProfileId
      },
      headers: {
        'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
      }
    }
  )
  if (!response.data.recipes.length) return // TODO: when no recipe found show some logs...
  const recipeWithUserInfo = extendRecipeWithUserInfo(response.data)
  dispatch({
    type: 'SET_SEARCH_PUBLIC_RECIPES',
    payload: {searchRecipe: recipeWithUserInfo, searchText: searchQuery}
  })
}
;

export const extendRecipeWithUserInfo = (recipeAndUserInfo: any) => {
  return recipeAndUserInfo.recipes.map((recipeWithUserInfo: any) => {
    return {
      ...recipeWithUserInfo.recipe,
      recipeCreatorInfo: {...recipeWithUserInfo.userData[0]}
    }
  })
}