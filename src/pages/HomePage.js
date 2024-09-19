import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';  // Import SearchBar component
import ReactPaginate from 'react-paginate';

const API_KEY = '84a9b5a1c84f4cec80f6bc96ee7461c0';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [cuisine, setCuisine] = useState('');
  const [query, setQuery] = useState('');

  const itemsPerPage = 5;

  const searchRecipes = async (searchQuery) => {
    setQuery(searchQuery);  // Update query
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey: API_KEY,
          query: searchQuery,
          cuisine,
          number: itemsPerPage,
          offset: page * itemsPerPage,
        },
      });
      setRecipes(response.data.results);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (query) {
      searchRecipes(query);
    }
  }, [page, cuisine]);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <SearchBar onSearch={searchRecipes} />  {/* Use SearchBar */}
      <div>
        <label>
          Filter by Cuisine:
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option value="">All</option>
            <option value="american">American</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            {/* Add more cuisines */}
          </select>
        </label>
      </div>
      <RecipeList recipes={recipes} />
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={Math.ceil(totalResults / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default HomePage;
