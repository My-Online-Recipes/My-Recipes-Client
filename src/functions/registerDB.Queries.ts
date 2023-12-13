
import axios from "axios";
import { getRecipes, getUserRecipeLinks } from "./recipesDB.Queries";
import { JWT } from "../utils/constants";
import { getJWTFromLocalStorage } from "../utils/common";

export const registerUserAndGetAllRecipes = async (userData: any) => {
  let userMetaData = await getUserDataFromDBIfExist(userData);
  if (userMetaData === null) {
    const createdUser = await createNewUser({
      name: userData.displayName,
      userAuthId: userData.uid,
      email: userData.email,
      photoURL: userData.photoURL,
      isLogIn: true
    })
    const jwt = createdUser.data.jwt;
    localStorage.setItem(JWT, jwt);
    return { userMetaData: createdUser, totalRecipeCount: 0 ,isNewUser: true };
  }
  localStorage.setItem(JWT, userMetaData.jwt);

  // Get all the recipes from the db.
  const recipesFromDBAndCount = await getRecipes(userMetaData._id)
  const userRecipeLinks = await getUserRecipeLinks(userMetaData._id, 1, 30)
  return {
    userMetaData: userMetaData,
    recipesFromDB: recipesFromDBAndCount.recipes,
    totalPrivateRecipeCount :recipesFromDBAndCount.totalRecipeCount,
    isNewUser: false,
    userRecipeLinks: userRecipeLinks
  }
}

export const createNewUser = async (userData: any): Promise<any> => {
  try {
    return await axios.post(`http://localhost:4000/user/create`,
      {...userData}, {
      // headers: {
      //   'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
      // }
    });
  } catch (e: any) {
    console.log("error", e)
  }
}

export const setUserLogOut = async (userAuthId: any): Promise<any> => {
  try {
    return await axios.post(`http://localhost:4000/user/isUserActivate`,{userAuthId, isLogIn: false},
      {
        headers: {
          'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
        }
      }
      );
  } catch (e: any) {
    console.log("error", e)
  }
}

export const getUserDataFromDBIfExist = async (userAuthData: any): Promise<any> => {
  try {
    const res = await axios.get(`http://localhost:4000/user/getUserByAuthId?userAuthId=${ userAuthData.uid }`,
      {
        headers: {
          'Authorization': `Bearer ${ getJWTFromLocalStorage() }`
        }
      });
    //TODO: add also users without google authe
    return res.data;
  } catch (e: any) {
    console.log("error", e)
  }
}



