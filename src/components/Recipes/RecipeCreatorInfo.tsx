import React from "react";
import {
  ImageWrapperStyled, InfoWrapperStyled,
  RecipeCreatorInfoWrapperStyled,
} from "../../style/RecipeCreatorInfo.styled";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../redux/selectors/user.selector";

interface Props {
  userData: any
}

export const RecipeCreatorInfo: React.FC<Props> = ({userData}) => {
  const userProfile = useSelector(getUserProfile);

  const navigate = useNavigate();
  const imageUrl = userData.photoURL

  const handleClick = () => {
    if (userProfile._id === userData._id){
      navigate('/myRecipesCatalog')
    } else {
      navigate('/publicRecipesCatalog', {state: { userData }})
    }
  };


  return (
    <RecipeCreatorInfoWrapperStyled onClick={ handleClick }>
      <InfoWrapperStyled>
        <ImageWrapperStyled imageUrl={ imageUrl }></ImageWrapperStyled>
        <div>{ userData.name }</div>
      </InfoWrapperStyled>
    </RecipeCreatorInfoWrapperStyled>
  )
}

export default RecipeCreatorInfo;

