import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";


export const AddNewRecipeLinkWrapper = styled.div`
  border: solid black 1px;
  padding: 21px;
  border-radius: 8px;
  background-color: rgb(243, 242, 243);
  
`;
export const NewRecipeLinkFormStyled = styled.form`
  gap: 16px;
  display: flex;
  @media ${ DEVICE.mobileL } {
    flex-direction: column
  }
`;

export const InputFieldStyle = styled.div`
  color: black;
  font-family: emoji;
  font-size: 20px;
`;