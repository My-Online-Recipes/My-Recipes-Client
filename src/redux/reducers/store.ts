import { combineReducers, createStore } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import userReducer from "./user.reducer";
import recipesCardsReducer from "./recipesCards.reducer";
import storage from 'redux-persist/lib/storage'
import searchPublicRecipeReducer from "./searchPublicRecipe.reducer";
import publicRecipesReducer from "./publicRecipes.reducer";
import userRecipeLinksReducer from "./userRecipeLinks.reducer";



const rootReducer = combineReducers({
  user: userReducer,
  searchPublicRecipes: searchPublicRecipeReducer,
  privateRecipesCards: recipesCardsReducer,
  publicRecipes: publicRecipesReducer,
  userRecipeLinks: userRecipeLinksReducer
});

const persistConfig = {
  key: 'key',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  // @ts-ignore
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);