import React, { useRef, useState } from "react";
import {
  PopupContent,
  RecipesInputsStyled,
  UploadImageWrapperStyled,
  RemoveLineButtonStyled,
  IngredientsAndProcessWrapperStyled,
  CreateNewRecipeContentWrapper, WrapperNewRecipeStyle
} from "../../style/AddNewRecipes.styled";
import { Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg"
import { ReactComponent as TrashIcon } from "../../assets/trash.svg"
import { ReactComponent as UploadIcon } from "../../assets/uploadIcon.svg"
import Button from "@mui/material/Button";
import { IRecipe } from "../../utils/interfaces";
import { BannerImageStyled } from "../../style/BannerImage.styled";

interface Props {
  onSave: (recipe: IRecipe) => void;
}

export const AddNewRecipesComponent: React.FC<Props> = ({onSave}) => {


  const [recipeName, setRecipeName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [notes, setNotes] = useState('');
  const [timeToMake, setTimeToMake] = useState<string>('');
  const [servingsNumber, setServingsNumber] = useState<string>('');
  const [isPrivate, setIsPrivet] = useState<boolean>(false); // TODO: for social search for the V2

  const [inputValue, setInputValue] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [inputProcedureValue, setInputProcedureValue] = useState<string>('');
  const [procedure, setProcedure] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleInputProcessChange = (event: any) => {
    setInputProcedureValue(event.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue.trim() !== '') {
      setIngredients((prevIngredients: any) => [...prevIngredients, inputValue]);
      setInputValue('');
    }
  };
  const handleAddProcess = () => {
    if (inputProcedureValue.trim() !== '') {
      setProcedure((prevProcess: any) => [...prevProcess, inputProcedureValue]);
      setInputProcedureValue('');
    }
  };

  const handleKeyPress = (event: any, name: string) => {
    switch (name) {
      case "INGREDIENTS":
        if (event.key === 'Enter') {
          handleAddIngredient();
        }
        ;
        break;
      case "PROCESS":
        if (event.key === 'Enter') {
          handleAddProcess();
        }
        break
      default:
        return null
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles: File[] = Object.values(e.target.files || {});

    const previews: string[] = [];

    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i ++) {
        const file = imageFiles[i];
        const reader = new FileReader();
//TODO: deeply understand ...
        reader.onload = () => {
          if (reader.result) {
            previews.push(reader.result.toString());
            if (previews.length === imageFiles.length) {
              setImagePreviews(previews);
            }
          }
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    }

    setImages(imageFiles);
  };

  const handleDeleteIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleDeleteProcedure = (index: number) => {
    const updatedProcedure = [...procedure];
    updatedProcedure.splice(index, 1);
    setProcedure(updatedProcedure);
  };

  const handleUpdateIngredient = (index: number, updatedValue: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = updatedValue;
    setIngredients(updatedIngredients);
  };


  const handleSave = () => {
    const recipe: IRecipe = {
      recipeName,
      ingredients,
      procedure,
      notes,
      timeToMake,
      servingsNumber,
      isPrivate,
      images,
    };
    onSave(recipe);
  };

  const isDisabled = !recipeName || ingredients.length === 0 || procedure.length === 0;


  const openUploadImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <WrapperNewRecipeStyle>
      <div>
        <BannerImageStyled style={ {padding: "190px 0px"} }></BannerImageStyled>
        <CreateNewRecipeContentWrapper></CreateNewRecipeContentWrapper>
      </div>
      <PopupContent>
        <RecipesInputsStyled>
          <TextField
            required
            label="Recipe Name"
            style={ {width: "100%", paddingBottom: "16px"} }
            value={ recipeName }
            onChange={ (e) => setRecipeName(e.target.value) }
          />
          <IngredientsAndProcessWrapperStyled>
            <div style={ {display: "flex", flexDirection: "column", flex: "1"} }>
              <div style={ {display: "flex", alignItems: "center"} }>
                <TextField
                  required
                  label="Ingredient"
                  value={ inputValue }
                  onChange={ handleInputChange }
                  onKeyPress={ (event) => handleKeyPress(event, "INGREDIENTS") }
                />
                <Button style={ {height: "55px"} } variant="contained" onClick={ handleAddIngredient }>
                  Add
                </Button>
                <TrashIcon style={ {cursor: "pointer", padding: "8px"} } onClick={ () => setIngredients([]) }/>
              </div>
              <ul style={ {paddingTop: "16px", maxHeight: "100px", overflowY: "auto"} }>
                { ingredients.map((ingredient: any, index: number) => (
                  <li key={ index }>{ ingredient }
                    <RemoveLineButtonStyled onClick={ () => handleDeleteIngredient(index) }>
                      <CloseIcon/>
                    </RemoveLineButtonStyled>
                  </li>
                )) }

              </ul>
            </div>
            <div style={ {display: "flex", flexDirection: "column", flex: "1"} }>
              <div style={ {display: "flex", alignItems: "center"} }>
                <TextField
                  required
                  label="Procedure Steps"
                  value={ inputProcedureValue }
                  onChange={ handleInputProcessChange }
                  onKeyPress={ (event) => handleKeyPress(event, "PROCESS") }
                />
                <Button style={ {height: "55px"} } variant="contained" onClick={ handleAddProcess }>
                  Add
                </Button>
                <TrashIcon style={ {cursor: "pointer", padding: "8px"} } onClick={ () => setProcedure([]) }/>
              </div>

              <ul style={ {paddingTop: "16px", maxHeight: "100px", overflowY: "auto"} }>
                { procedure.map((process: any, index: number) => (
                  <li key={ index }>{ process }
                    <RemoveLineButtonStyled onClick={ () => handleDeleteProcedure(index) }>
                      <CloseIcon/>
                    </RemoveLineButtonStyled>
                  </li>
                )) }
              </ul>
            </div>
          </IngredientsAndProcessWrapperStyled>

          <div style={ {height: "140px", width: "100%", display: "flex", flexDirection: "column"} }>
            <UploadImageWrapperStyled onClick={ openUploadImages }>
              <UploadIcon/>
              <div>
                Upload Image
              </div>
              <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ handleFileChange }
                style={ {display: 'none'} }
              />
            </UploadImageWrapperStyled>
            { imagePreviews && (
              <div style={ {display: "flex", maxWidth: "400px", overflowX: "auto", alignSelf: "center"} }>
                {
                  imagePreviews.map((imagePreview, index) => {
                    return <img key={ index } style={ {width: "100px", padding: "8px"} } src={ imagePreview }
                                alt="Uploaded"/>
                  })
                }
              </div>
            ) }
          </div>

          <div style={ {width: "100%", display: "flex", justifyContent: "space-evenly"} }>
            <TextField
              label="Time To Make"
              onChange={ (e) => setTimeToMake(e.target.value) }
            />

            <TextField
              label="Serving Number"
              type="number"
              onChange={ (e) => setServingsNumber(e.target.value) }
            />
          </div>

          <div style={ {paddingTop: "16px", width: "100%", maxHeight: "57px", overflowY: "auto"} }>
            <TextField
              style={ {width: "100%"} }
              label="Notes"
              multiline
              onChange={ (e) => setNotes(e.target.value) }
            />
          </div>

          <FormControlLabel
            control={ <Checkbox/> }
            label="Private Recipe"
            onChange={ (e) => setIsPrivet(!isPrivate) }/>

          <Button style={ {width: "100%"} } variant="contained" color="success" onClick={ () => {
            handleSave();
            // TODO: show loader untill the image is saved and the recipe is create.
          } } disabled={ isDisabled }>
            Done
          </Button>
        </RecipesInputsStyled>
      </PopupContent>
    </WrapperNewRecipeStyle>
  )
}

export default AddNewRecipesComponent;
