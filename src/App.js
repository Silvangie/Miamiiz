import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from "../src/Recipe";



const App = () => {

  const APP_ID = "00ef6e28";
  const APP_KEY = "5dad1fce1767009d36985eeb88b57b2f";
  const url = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  // Toutes les states de l'application


    useEffect(() => {
      getRecipes();
    }, []);
    // c'est le second argument de la fonction useEffect
    // afin que la page ne charge qu'une fois cette fonction


    // Création du fetch afin de récupérer les données
    // utilisation de la fonction async await
    const getRecipes = async () => {
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);
      console.log(data.hits);
      setRecipes(data.hits);
    }


    return (
      <div className="App">
        <h1> Miamiiz </h1>
        <form className="search-form">
          <input className="search-bar" type="text" value={search} />
          <button className="search-button" type="submit"> 
          Search
          </button>
        </form>
        {/* creation de la map qui affichera les informations d'une carte de recette*/}
        {recipes.map(recipe => (
          <Recipe 
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image} 
          />
          // Les props
        ))};
      </div>
    );
  }
export default App;
