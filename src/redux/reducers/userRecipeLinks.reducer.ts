const initialState = {
  userRecipeLinks: [{
    _id: '',
    userId: '',
    linkUrl: '',
    recipeLinkName: '',
    imageUrl: '',
  }],
  isFetchRecipeLinks: false
}

function userRecipeLinksReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_USER_RECIPE_LINKS':
      const userRecipeLinksFromPayload = action.payload.userRecipeLinks
      let currentPublicLinks = state.userRecipeLinks
      if (!state.isFetchRecipeLinks) {
        return {
          isFetchRecipeLinks: true,
          userRecipeLinks: action.payload.userRecipeLinks.recipeLinks
        }
      }
      currentPublicLinks.push(...userRecipeLinksFromPayload)
      return {
        ...state,
        userRecipeLinks: currentPublicLinks
      }
    case 'SET_CREATED_RECIPE_LINK':
      const newRecipeLinksFromPayload = action.payload.userRecipeLinks
      let currentPublicLinksFromState = state.userRecipeLinks
      if (!state.isFetchRecipeLinks) {
        return {
          isFetchRecipeLinks: true,
          userRecipeLinks: action.payload.userRecipeLinks.recipeLinks
        }
      }
      currentPublicLinksFromState.push(newRecipeLinksFromPayload)
      return {
        ...state,
        userRecipeLinks: currentPublicLinksFromState
      }

    case 'REMOVE_USER_RECIPE_LINKS':
      return {
        ...initialState
      }

    default:
      return state;
  }
}

export default userRecipeLinksReducer;