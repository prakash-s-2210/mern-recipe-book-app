import React, {  useMemo, useState } from "react";
import "../profilePage/ProfilePage.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSavedRecipes } from "../../state/index";
import Header from "../header/Header";
import User from "../user/User";
import RecipeList from "../recipeList/RecipeList";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const dispatch = useDispatch();

  // Select user, token, and saved recipes from the Redux store
  const { user, token, savedRecipes } = useSelector((state) => state);

  // Get API key from environment variables
  const API_KEY = process.env.REACT_APP_RECIPE_APP_API_KEY;

  // Fetch saved recipes and update state and Redux store
  const getSavedRecipes = async () => {
      try{
       // Fetch saved recipes from the backend
      const savedRecipesResponse = await axios.get(
        `https://recipe-book-ycpw.onrender.com/users/${user._id}/savedRecipe`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const savedRecipesData = await savedRecipesResponse.data;

      // Update saved recipes in the Redux store
      if (savedRecipesData) {
        dispatch(
          setSavedRecipes({
            savedRecipes: savedRecipesData,
          })
        );
      }

      // Fetch recipe details from Spoonacular API for each saved recipe
      const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${savedRecipes.join(',')}`);
      const data =  response.data;
      setRecipes([...data]);
    }
    catch(error){
      console.log(error);
    }
  };
  // Call getSavedRecipes() only once on initial render
  useMemo(() => {
    getSavedRecipes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // Callback function to handle click on a recipe in the recipe list
  function handleRecipeDetails(check , recipeDetail) {
    setRecipeDetail(recipeDetail);
  }
  
  // Function to navigate to Home Page 
  function handleNavigateHome(){
    setRecipeDetail(null);
    navigate('/home');
  }

  // Function to navigate to Profile Page 
  function handleNavigateProfile(userId){
    setRecipeDetail(null);
    navigate(`/profile/${userId}`)
  }

  return (
    <div>
      <Header isHome={false} handleNavigateHome = {handleNavigateHome} handleNavigateProfile = {handleNavigateProfile} />
      {recipeDetail ? (
          <RecipeDetail recipe={recipeDetail} />
        ) : (
      <div className="profile-container">
        <User user={user} />
        <h1 className="saved-recipes-text">Saved Recipes</h1>
        
          <div className="profile-recipe-catalogue-container">
            {recipes &&
              recipes.map((recipe, index) => {
                return (
                  <RecipeList
                    key={index}
                    recipe={recipe}
                    handleRecipeDetails={handleRecipeDetails}
                    isBookmarked={savedRecipes.includes(recipe.id)}
                    isHome = {false}
                  />
                );
              })}
          </div>
      </div>)}
    </div>
  );
};

export default ProfilePage;
