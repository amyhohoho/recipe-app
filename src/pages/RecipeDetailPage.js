import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeDetail from '../components/RecipeDetail';  // Import RecipeDetail component

const API_KEY = '84a9b5a1c84f4cec80f6bc96ee7461c0';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipeDetail = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: API_KEY,
          },
        });
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipeDetail();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <RecipeDetail recipe={recipe} />  {/* Use RecipeDetail */}
    </div>
  );
};

export default RecipeDetailPage;
