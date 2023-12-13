import React, { ChangeEvent, useEffect } from "react";
import {
  BannerImageStyled,
  SearchButtonStyled, SearchInputAndIconStyled,
  SearchInputStyled
} from "../../style/BannerImage.styled";
import { ReactComponent as SearchIcon } from "../../assets/searcIcon.svg"
import { useDispatch } from "react-redux";
import { fetchSearchRequest } from "../../functions/recipesDB.Queries";

interface Props {
  setSearchQuery: (searchText: string) => void;
  searchQuery: string;
  publicUserData: any;
}

export const Banner: React.FC<Props> = ({ setSearchQuery, searchQuery, publicUserData  }) => {
  const dispatch = useDispatch();

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
    await fetchSearchRequest(searchQuery, false, publicUserData._id, dispatch)
  };

  return (
    <BannerImageStyled style={{  padding: "160px 0px"}}>
      <SearchButtonStyled>
        <SearchInputAndIconStyled>
          <SearchInputStyled
            placeholder="Search for recipe"
            onChange={ handleSearchChange }
            type="text"
            value={ searchQuery }/>
          <SearchIcon style={ {alignSelf: "center", width: "18px", margin: "4px"} }
          />
        </SearchInputAndIconStyled>
      </SearchButtonStyled>
    </BannerImageStyled>
  )
}

export default Banner;

