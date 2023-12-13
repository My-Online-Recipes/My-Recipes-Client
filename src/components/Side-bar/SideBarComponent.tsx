import React, { useEffect, useState } from "react";
import { Pages, PagesRoutes } from "../../utils/constants";
import { LinkBox, LogoImage, LogoStyled, NavigationStyled, SideBarStyled } from "../../style/side-bar.styled";
import { useLocation, useNavigate } from "react-router-dom";
import UserImageIcon from "./UserImageIconComponent";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../redux/selectors/user.selector";
import LogoIcon from "../../assets/logo.png"

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userProfile = useSelector(getUserProfile);
  const currentURL = window.location.href;
  const urlObject = new URL(currentURL);
  const extractedRoute = urlObject.pathname;
  const [activeLink, setActiveLink] = useState<string>(extractedRoute as PagesRoutes);

  const Logo = () => {
    return <LogoStyled
      onClick={ () => {
        setActiveLink('')
        navigate('/');
      } }>
      <LogoImage src={ LogoIcon }/>
    </LogoStyled>;
  };

  const handleClick = (path: string) => {
    navigate(path)
    setActiveLink(path)
  };


  const Navigation = () => {

    return (
      <NavigationStyled>
        <LinkBox onClick={ () => handleClick(PagesRoutes.ABOUT) }
                 active={ activeLink === PagesRoutes.ABOUT }>{ Pages.ABOUT }
        </LinkBox>
        { userProfile.email &&
            <LinkBox onClick={ () => handleClick(PagesRoutes.CREATE_NEW_RECIPE) }
                     active={ activeLink === PagesRoutes.CREATE_NEW_RECIPE }>{ Pages.CREATE_NEW_RECIPE }
            </LinkBox> }
        { userProfile.email && <LinkBox onClick={ () => handleClick(PagesRoutes.MY_RECIPES_CATALOG) }
                                        active={ activeLink === PagesRoutes.MY_RECIPES_CATALOG }>{ Pages.MY_RECIPES_CATALOG }</LinkBox> }
        { userProfile.email && <LinkBox onClick={ () => handleClick(PagesRoutes.MY_LINKS) }
                                        active={ activeLink === PagesRoutes.MY_LINKS }>{ Pages.MY_LINKS }</LinkBox> }
      </NavigationStyled>
    );
  };

  // change the navition mark when the location is chane
  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])


  return (
    <SideBarStyled>
      <Logo/>
      <Navigation/>
      { userProfile.email && <UserImageIcon/> }
    </SideBarStyled>
  );
}

export default SideBar;
