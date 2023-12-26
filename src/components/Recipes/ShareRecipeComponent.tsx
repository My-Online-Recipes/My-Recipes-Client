import React, { useEffect, useState } from 'react';
import { IconWrapperStyled, WrapperStyled } from "../../style/ShareRecipeComponent.styled";
import { ReactComponent as ShareIcon } from "../../assets/share.svg"
import { ReactComponent as LikeIcon } from "../../assets/like.svg"
import { IRecipe } from "../../utils/interfaces";
import CopyToClipboard from 'react-copy-to-clipboard';
import { successToast } from "../../utils/common";

interface Props {
  recipe: IRecipe
}

export const URL_LINK = "https://cooking-recipes-9bea3.web.app/recipePage?id="

export function creatLinkUrlFromRecipeId(recipeId: string | undefined) {
  return URL_LINK + recipeId;
}


const ShareRecipeComponent: React.FC<Props> = ({recipe}) => {

  const [urlLink, setUrlLink] = useState<any>();
  const [isPrivate, setIsPrivate] = useState<any>(recipe && recipe.isPrivate);

  useEffect(() => {
    if (recipe) {
      setIsPrivate(recipe.isPrivate)
      const newLinkUrl = creatLinkUrlFromRecipeId(recipe._id)
      setUrlLink(newLinkUrl)
    }
  }, [recipe])

  return (
    <WrapperStyled>
      <IconWrapperStyled>
        <LikeIcon/>
      </IconWrapperStyled>
      { !isPrivate &&
          <IconWrapperStyled>
              <CopyToClipboard text={ urlLink }><ShareIcon onClick={ () => {
                successToast("Copy The Link Success")
              } }/></CopyToClipboard>
          </IconWrapperStyled>
      }
      {/*<IconWrapperStyled>*/ }
      {/*  <CommentIcon style={{width: "30px", height: "30px" }} />*/ }
      {/*</IconWrapperStyled>*/ }
    </WrapperStyled>
  );
}

export default ShareRecipeComponent;
