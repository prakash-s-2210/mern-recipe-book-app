// Importing React and other required modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../homePage/HomePage.scss";
import Header from "../header/Header";
import RecipeList from "../recipeList/RecipeList";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import { setSavedRecipes } from "../../state";

// HomePage component
const HomePage = () => {
  // Using useDispatch and useSelector hooks
  const dispatch = useDispatch();
  const { user, savedRecipes, token } = useSelector((state) => state);

  // State for recipe detail, random recipes and searched recipes
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState();

  // API Key and URLs for Spoonacular API
  const API_KEY = process.env.REACT_APP_RECIPE_APP_API_KEY;
  const SEARCH_RECIPE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=12`;
  const RANDOM_RECIPE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=12`;

  // Function to handle Bookmark click
  const handleBookmarkClick = async (recipeId) => {
    const response = await axios.put(
      `https://recipe-book-ycpw.onrender.com/users/${user._id}/savedRecipe`,
      { recipeId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const savedRecipesData = response.data;
    if (savedRecipesData) {
      dispatch(
        setSavedRecipes({
          savedRecipes: savedRecipesData,
        })
      );
    }
  };

  // Random Recipes
  
  // Function to get random recipes
  const getRandom = async () => {
    const api = await axios.get(RANDOM_RECIPE_URL);
    setRandomRecipes(api.data.recipes);
  };
  useEffect(() => {
    getRandom();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

   // Function to set recipe detail state
  function handleRecipeDetails(recipeDetail) {
    setRecipeDetail(recipeDetail);
  }

  // Function to search recipes using Spoonacular API
  const searchRecipes = async (query) => {
    const response = await axios.get(SEARCH_RECIPE_URL, {
      params: {
        query: query,
      },
    });
    setSearchedRecipes(response.data.results);
  };

  return (
    <div className="home-page-container">
      {/* Renders the header component with the search bar and profile icon */}
      <Header searchRecipes={searchRecipes} isHome={true} />

      {/* Renders the recipe list or the recipe detail component */}
      {recipeDetail ? <RecipeDetail recipe = {recipeDetail}/>
      :
      <div className="recipe-catalogue-container">
        {/* Renders the searched recipes if available, otherwise renders random recipes */}
        {searchedRecipes ? 
         searchedRecipes &&
         searchedRecipes.map((recipe, index) => {
           return (
             <RecipeList key={index} recipe={recipe}  handleRecipeDetails = {handleRecipeDetails} onBookmarkClick={handleBookmarkClick} isBookmarked={savedRecipes.includes(recipe.id) } isHome = {true} />
           );
         }) 
         :
        randomRecipes &&
          randomRecipes.map((recipe, index) => {
            return (
              <RecipeList key={index}  recipe={recipe}  handleRecipeDetails = {handleRecipeDetails} onBookmarkClick={handleBookmarkClick} isBookmarked={savedRecipes.includes(recipe.id)} isHome = {true} />
            );
          })  
          }
      </div>}
    </div>
  );
};

export default HomePage;
