import React, { useState } from "react";
import { setUserRecipeLink } from "../../functions/recipesDB.Queries";
import { IRecipeLink } from "../Pages/MyLinkdPage";
import { useDispatch } from "react-redux";
import { AddNewRecipeLinkWrapper, NewRecipeLinkFormStyled } from "../../style/AddNewRecipeLink.styled";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { errorToast } from "../../utils/common";

interface Props {
  userId: string
}

export const AddNewRecipeLink: React.FC<Props> = ({userId}) => {

  const dispatch = useDispatch();

  const [linkName, setLinkName] = useState('');
  const [linkDescription, setLinkDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleNameChange = (event: any) => {
    setLinkName(event.target.value);
  };

  const handleDescription1Change = (event: any) => {
    setLinkDescription(event.target.value);
  };

  const handleUrlChange = (event: any) => {
    setLinkUrl(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();


    const recipeLink: IRecipeLink = {
      userId,
      recipeLinkUrl: linkUrl,
      recipeLinkName: linkName,
      recipeLinkDescription: linkDescription
    }
    const isValidUrl = await isValidURL(recipeLink.recipeLinkUrl);
    if (!isValidUrl) {
      errorToast("Error, Link is not valid!")
      return
    }

    const response = await setUserRecipeLink(recipeLink)
    setLinkName('')
    setLinkDescription('')
    setLinkUrl('')
    dispatch({
      type: 'SET_CREATED_RECIPE_LINK',
      payload: {
        userRecipeLinks: response
      }
    })
  };

  async function isValidURL(url: string) {
    try {
      const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
      return pattern.test(url);
    } catch (error) {
      return false;
    }
  }

  const enableSave = !!(linkName.length && linkUrl.length)
  return (
    <AddNewRecipeLinkWrapper>
      <NewRecipeLinkFormStyled onSubmit={ handleSubmit } >
        <div>
          <TextField
            required
            label="Recipe link name:"
            style={ {width: "100%"} }
            value={ linkName }
            onChange={ handleNameChange }
          />
        </div>
        <div>
          <TextField
            label="Link Description:"
            style={ {width: "100%"} }
            value={ linkDescription }
            onChange={ handleDescription1Change }
          />
        </div>
        <div>
          <TextField
            required
            label="Recipe link URL:"
            style={ {width: "100%"} }
            value={ linkUrl }
            onChange={ handleUrlChange }
          />
        </div>
        <Button type="submit" variant="contained" color="success" onClick={ () => {
        } } disabled={ !enableSave }>
          Done
        </Button>


      </NewRecipeLinkFormStyled>
    </AddNewRecipeLinkWrapper>
  );
}

export default AddNewRecipeLink;
