import React, { useState } from "react";
import "../recipeDetail/RecipeDetail.scss";

/**
 * Renders the recipe details component
 * @param {Object} recipe - The recipe object containing recipe information
 * @returns {JSX.Element} - The recipe details component
 */
const RecipeDetail = ({recipe}) => {
  const [activeTab, setActiveTab ] = useState('instructions')
  return (
    <div className="recipe-detail-container">
      <h1 className="recipe-detail-heading">{recipe.title}</h1>
      <div className="recipe-detail-flex-container">
        <div className="recipe-detail-left-wrapper">
          <span className="cooking-time">Cooking time : <span style={{color: "#5457b6"}}>{recipe.readyInMinutes}  minutes</span></span>
          <img
            className="recipe-detail-image"
            src={recipe.image}
            alt={recipe.title}
          />
        </div>
        <div className="recipe-detail-right-wrapper">
          <div className="recipe-detail-button-wrapper">
            <button className={`${activeTab === 'instructions' ? 'active' : 'inactive'}`}
            onClick={()=> {
              setActiveTab('instructions')
            }}>Instructions</button>
            <button className={`${activeTab === 'ingredients' ? 'active' : 'inactive'}`}
            onClick={() => {
              setActiveTab('ingredients');
            }}>Ingredients</button>
          </div>
          {activeTab === "instructions" && (
            <div className="recipe-detail-instruction">
              <div
                dangerouslySetInnerHTML={{
                  __html: recipe.summary,
                }}
              ></div>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions,
                }}
              ></div>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
