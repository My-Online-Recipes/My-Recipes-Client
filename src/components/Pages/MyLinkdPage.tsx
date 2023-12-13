import React from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../redux/selectors/user.selector";
import { getRecipeLinks } from "../../redux/selectors/userRecipeLinks.selector";
import { RecipeLinkTicket } from "../Recipes/RecipeLinkTicket";
import AddNewRecipeLink from "../Recipes/AddNewRecipeLink";
import { BannerImageStyled } from "../../style/BannerImage.styled";
import { WrapperMyLinks } from "../../style/MyLinkPage.styled";


export const colors = [
  'rgb(191 213 165)',
  'rgb(169 209 122)',
  'rgb(146 203 79)',
  'rgb(124 199 36)',
  'rgb(108 195 7)',
  'rgb(127 152 99)',
  'rgb(111 148 69)',
  'rgb(97 148 39)',
];


export interface IRecipeLink {
  userId: string,
  recipeLinkUrl: string,
  recipeLinkName: string,
  recipeLinkDescription: string,
  imageUrl?: [string],
}
export const MyRecipeLinksPage: React.FC = () => {

const recipeLinksSelector = useSelector(getRecipeLinks);
const recipeLinksArray = recipeLinksSelector.userRecipeLinks;
  const userProfile = useSelector(getUserProfile);

  return (
    <WrapperMyLinks>
      <BannerImageStyled style={{  padding: "140px 0px"}}>
        <AddNewRecipeLink userId={userProfile._id}></AddNewRecipeLink>
      </BannerImageStyled>
          {recipeLinksArray &&  recipeLinksArray.map((recipeLink: IRecipeLink, index: number) => {
            const colorIndex = index % colors.length; // Repeats colors if there are more elements than colors
          return <RecipeLinkTicket key={index} recipeLink={recipeLink} index={index + 1} colorIndex={colorIndex}/>
        })}
      {/*<TestComponent/>*/}
    </WrapperMyLinks>
  )
}

export default MyRecipeLinksPage;

