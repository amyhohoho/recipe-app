import './RecipeDetail.css';
import React from 'react';

const RecipeDetail = ({ recipe }) => {
  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Health Information:</h3>
      <ul>
        {recipe.vegan && <li>Vegan</li>}
        {recipe.dairyFree && <li>Dairy-Free</li>}
        {recipe.glutenFree && <li>Gluten-Free</li>}
        {recipe.vegetarian && <li>Vegetarian</li>}
      </ul>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <div
          dangerouslySetInnerHTML={{
            __html: recipe.instructions,
          }}
        />      
    </div>
  );
};

export default RecipeDetail;
