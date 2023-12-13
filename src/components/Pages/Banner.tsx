import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BannerImageStyled,
  RadioBtnFormWrapperStyled,
  SearchButtonStyled, SearchInputAndIconStyled,
  SearchInputStyled, SingleRadioBtnWrapperStyled
} from "../../style/BannerImage.styled";
import { ReactComponent as SearchIcon } from "../../assets/searcIcon.svg"
import { useDispatch, useSelector } from "react-redux";
import { getSearchPublicRecipe } from "../../redux/selectors/searchPublicRecipes.selector";
import { getUserProfile } from "../../redux/selectors/user.selector";
import { Radio } from "@mui/material";
import { fetchSearchRequest } from "../../functions/recipesDB.Queries";

interface Props {
  setSearchQuery: (searchText: string) => void;
  searchQuery: string;
  isPublicRecipeCatalog?: boolean
}

export const Banner: React.FC<Props> = ({ setSearchQuery, searchQuery, isPublicRecipeCatalog }) => {
  const dispatch = useDispatch();
  const [isPrivate, setIsPrivate] = useState(false);

  const searchPublicRecipesCards = useSelector(getSearchPublicRecipe);
  const userProfile = useSelector(getUserProfile);
  const searchText = searchPublicRecipesCards.searchText



  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setSearchQuery(value);
    dispatch({type: 'SET_SEARCH_TEXT', payload: {searchText: value}})
  };


  // Perform search when the query meets the conditions
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 1) {
        performSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async () => {
    await fetchSearchRequest(searchQuery, isPrivate, userProfile._id, dispatch)
  };

  return (
    <BannerImageStyled style={{  padding: "160px 0px"}}>
      <SearchButtonStyled>
        <SearchInputAndIconStyled>
          <SearchInputStyled
            placeholder="Search for recipe"
            onChange={ handleSearchChange }
            type="text"
            value={ searchQuery || searchText }/>
          <SearchIcon style={ {alignSelf: "center", width: "18px", margin: "4px"} }
          />
        </SearchInputAndIconStyled>
        { !isPublicRecipeCatalog && <RadioBtnFormWrapperStyled>
          <SingleRadioBtnWrapperStyled>
            My Recipes
            <Radio
              checked={ isPrivate }
              onChange={ () => {
                setIsPrivate(true)
                dispatch({type: 'SET_SEARCH_TEXT', payload: {searchText: ''}})
                setSearchQuery('')
              } }
              value={ isPrivate }
              name="radio-buttons"
              inputProps={ {'aria-label': 'A'} }
            />
          </SingleRadioBtnWrapperStyled>
          <SingleRadioBtnWrapperStyled>
            Public Recipes
            <Radio
              checked={ !isPrivate }
              onChange={ () => {
                setIsPrivate(false)
                dispatch({type: 'SET_SEARCH_TEXT', payload: {searchText: ''}})
                setSearchQuery('')
              } }
              value={ isPrivate }
              name="radio-buttons"
              inputProps={ {'aria-label': 'B'} }
            />
          </SingleRadioBtnWrapperStyled>
        </RadioBtnFormWrapperStyled>}
      </SearchButtonStyled>
    </BannerImageStyled>
  )
}

export default Banner;

