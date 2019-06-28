import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from "../src/Recipe";




const App = () => {

  const APP_ID = "00ef6e28";
  const APP_KEY = "5dad1fce1767009d36985eeb88b57b2f";
  const [query, setQuery] = useState('chicken');
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  // Toutes les states de l'application


    useEffect(() => {
      getRecipes();
    }, [query]);
    // c'est le second argument de la fonction useEffect
    // afin que la page ne charge qu'une fois cette fonction = refresh à l'acivation du submit
    // Avoir des recettes à chaque fois que l'on tape un aliment dans l'input


    // Création du fetch afin de récupérer les données
    // utilisation de la fonction async await
    const getRecipes = async () => {
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);
      console.log(data.hits);
      setRecipes(data.hits);
    }
    

    // event  des l'activation de la fonction Onchange, on aura accès à l'event qui sera activer.
    // value = la valeur de l'input
    // setSearch = setState = il change le state par default
    const updateSearch = e => {
      setSearch(e.target.value);
      console.log('input:', search);
    }



    // activation de la fonction dés le clique sur submit
    // e.preventDefault = éviter le rafraichissement de la page
    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }

  

    return (
      <div className="App">
        <h1> Miamiiz </h1>
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit"> 
          Search
          </button>
        </form>
        <div className="recipes">
          {/* creation de la map qui affichera les informations d'une carte de recette*/}
          {recipes.map(recipe => (
            <Recipe 
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients}
            />
            // Les props
          ))}
        </div>
      </div>
    );
  }
export default App;
