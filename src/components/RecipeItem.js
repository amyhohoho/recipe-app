import './RecipeItem.css';
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ recipe }) => {
  return (
    <div className="recipe-item">
      <Link to={`/recipe/${recipe.id}`}>
        <h3>{recipe.title}</h3>
        <img src={recipe.image} alt={recipe.title} />
      </Link>
    </div>
  );
};

export default RecipeItem;
