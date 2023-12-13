export const VIDEO_COVER = 'https://firebasestorage.googleapis.com/v0/b/cooking-recipes-9bea3.appspot.com/o/video%2Ffile.mp4cd6c58d6-cb2b-4edc-ab5b-85d2869b58b1%7D?alt=media&token=28ed6f4d-be05-4d72-970c-bcc22354246e'


const SCREEN_MAX_SIZE = {
  mobileL: '767px',
};


export const DEVICE = {
  mobileL: `(max-width: ${SCREEN_MAX_SIZE.mobileL})`,
};

export enum PagesRoutes {
  Home = '/home',
  CREATE_NEW_RECIPE = '/createNewRecipe',
  LOGIN = '/logIn', //TODO: change LogIn to home in all the app
  MY_RECIPES_CATALOG = '/myRecipesCatalog',
  PUBLIC_RECIPES_CATALOG = '/publicRecipesCatalog',
  ABOUT = '/About',
  MY_LINKS = '/myLinks',
}

export enum Pages {
  Home = 'Home',
  MY_RECIPES_CATALOG = 'Recipes Catalog',
  CREATE_NEW_RECIPE = 'Create New Recipe',
  ABOUT = 'About',
  MY_LINKS = 'My Links',
}

export const PAGE_SIZE = 4

export const JWT = 'JWT';
