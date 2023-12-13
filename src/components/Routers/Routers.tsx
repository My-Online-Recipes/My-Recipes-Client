import React, { useEffect } from 'react';
import { BrowserRouter, Route, Navigate, Routes, useLocation } from 'react-router-dom';
import AboutPage from "../Pages/AboutPage";
import RecipesCatalog from "../Pages/RecipesCatalogPage";
import RecipePage from "../Pages/RecipePage";
import CreateNewRecipePage from "../Pages/CreateNewRecipePage";
import SignInComponent from "../Authentication/SignIn";
import SideBar from "../Side-bar/SideBarComponent";
import { MyRecipeLinksPage } from "../Pages/MyLinkdPage";
import PublicRecipeCatalogPage from "../Pages/PublicRecipeCatalogPage";

interface Props {
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const RoutesComponent: React.FC<Props> = () => {

  return (
      <BrowserRouter>
        <SideBar></SideBar>
        <ScrollToTop/>

        <Routes>
          <Route path="/home" element={ <SignInComponent/> }/>
          <Route path="/createNewRecipe" element={ <CreateNewRecipePage/> }/>
          <Route path="/about" element={ <AboutPage/> }/>
          <Route path="/recipePage" element={ <RecipePage/> }/>
          <Route path="/myLinks" element={ <MyRecipeLinksPage/> }/>
          <Route path="/myRecipesCatalog" element={ <RecipesCatalog/> }/>
          <Route path="/publicRecipesCatalog" element={ <PublicRecipeCatalogPage/> }/>
          <Route path="/*" element={ <Navigate to="/home"/> }/> {/* Redirect all other paths to the landing page */ }
        </Routes>
      </BrowserRouter>
  );
}

export default RoutesComponent;
