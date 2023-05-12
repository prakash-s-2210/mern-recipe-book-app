import React,{} from 'react';
import "../recipeList/RecipeList.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';


/**
 * Renders a single recipe in the recipe catalog list
 * @param {Object} recipe - The recipe object containing recipe information
 * @param {Function} handleRecipeDetails - The function to handle clicking on a recipe to show details
 * @param {Function} onBookmarkClick - The function to handle bookmarking a recipe
 * @param {Boolean} isBookmarked - Whether the recipe is bookmarked
 * @param {Boolean} isHome - Whether the recipe is being rendered on the home page
 * @returns {JSX.Element} - The recipe list component
 */
const RecipeList = ({ recipe, recipeType, handleRecipeDetails, onBookmarkClick, isBookmarked, isHome }) => {
  function handleRecipeClick(){
    if(recipeType === "searchedRecipe"){
      handleRecipeDetails(true, recipe.id);
    }
    else if(recipeType === "randomRecipe"){
      handleRecipeDetails(false, recipe);
    }
    else{
      handleRecipeDetails(false, recipe);
    }
  }
  return (
    <div className='recipe-container' onClick={handleRecipeClick}>
      <img  src = 
      {recipe.image}
       alt = {recipe.title}
        className='recipe-catalogue-image'/>
      <div className='recipe-catalogue-title'>
        <span className='recipe-title'>
          {recipe.title}
        </span>
        {isHome && <FontAwesomeIcon 
        className={`bookmark-icon ${
          isBookmarked ? 'bookmarked' : ''
        }`}
        icon = {faBookmark} onClick={(e) => {
          e.stopPropagation();
          onBookmarkClick(recipe.id)
        }}/>}
      </div>
    </div>
  )
}

export default RecipeList