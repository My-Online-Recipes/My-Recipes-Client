import styled from "@emotion/styled";
import { LinkBoxProps } from "../utils/interfaces";
import { DEVICE } from "../utils/constants";


export const LinkBox = styled.div<LinkBoxProps>`
  margin: 0 35px 0 35px;
  cursor: pointer;
  color: ${ props => (props.active ? 'rgb(254 80 110)' : 'black') };
  border-bottom: ${ props => (props.active ? '1px solid rgb(254 80 110)' : 'none') };

  :hover {
    color: rgb(254 80 110);
  }
  @media ${ DEVICE.mobileL } {
    margin: 0;
  }
`;

export const SideBarStyled = styled.div`
  display: flex;
  position: sticky;
  top: 0px;
  z-index: 2;
  align-items: center;
  padding: 10px 16px;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgb(239, 234, 230);
  min-height: 50px;



`;

export const LogoStyled = styled.div`
  cursor: pointer;
  
  @media ${ DEVICE.mobileL } {
  padding-right: 4px;
  }
`;
export const NavigationStyled = styled.div`
  flex: 1;
  text-align: center;
  flex-direction: row;
  display: flex;
  justify-content: center;
  @media ${ DEVICE.mobileL } {
    font-size: 12px;
    gap: 12px;
    align-items: center;

  }
`;
export const LogoImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%; /* Set the border radius to 50% to create a circle */
  border: 2px solid #333; /* Optional: Add a border */
  @media ${ DEVICE.mobileL } {
    display: flex;
  }
`;




