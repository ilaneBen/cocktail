import React, { useState, useEffect } from 'react';
import '../assets/css/cocktail.css'; // Assure-toi de créer et d'importer le fichier CSS
import { Link } from 'react-router-dom'; // Importer Link pour la navigation

const Home = () => {
  const [cocktails, setCocktails] = useState([]); // Pour stocker les cocktails récupérés
  const [loading, setLoading] = useState(false); // Pour indiquer le chargement des données
  const [ingredientInput, setIngredientInput] = useState(''); // Pour stocker la recherche de l'utilisateur
  const [error, setError] = useState(''); // Pour gérer les erreurs potentielles

  // Fonction pour récupérer les cocktails pour chaque ingrédient séparément
  const fetchCocktailsByIngredient = async (ingredient) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      return data.drinks || []; // Retourne les cocktails trouvés ou une liste vide
    } catch (error) {
      console.error(`Erreur lors de la récupération des cocktails avec l'ingrédient ${ingredient}:`, error);
      return [];
    }
    
  };

  // Fonction pour récupérer les cocktails par plusieurs ingrédients
  const fetchCocktailsIngredients = async () => {
    if (!ingredientInput.trim()) return;

    setLoading(true);
    setError('');
    const ingredients = ingredientInput.split(' ').map(ing => ing.trim().toLowerCase()); // Diviser les ingrédients par virgules
    let commonCocktails = [];
    console.log(ingredients)

    try {
      // Pour chaque ingrédient, chercher les cocktails et trouver ceux qui contiennent tous les ingrédients
      for (let i = 0; i < ingredients.length; i++) {
        const cocktailsForIngredient = await fetchCocktailsByIngredient(ingredients[i]);
        if (i === 0) {
          commonCocktails = cocktailsForIngredient;
        } else {
          // Filtrer les cocktails pour ne garder que ceux qui existent dans toutes les recherches
          commonCocktails = commonCocktails.filter(cocktail =>
            cocktailsForIngredient.some(item => item.idDrink === cocktail.idDrink)
          );
        }
      }

      if (commonCocktails.length === 0) {
        setError('Aucun cocktail trouvé pour ces ingrédients.');
      }

      setCocktails(commonCocktails); // Mettre à jour l'état avec les cocktails communs
    } catch (error) {
      console.error('Erreur lors de la récupération des cocktails:', error);
      setError('Une erreur s\'est produite lors de la recherche.');
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la soumission du formulaire de recherche
  const handleSearch = (event) => {
    event.preventDefault();
    fetchCocktailsIngredients(); // Lancer la recherche lorsque l'utilisateur soumet le formulaire
  };


  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'j', 'm', 'n'];

  // Fonction pour récupérer les cocktails via l'API
  const fetchCocktails = async () => {
    const cocktailList = [];

    for (let letter of letters) {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${letter}`);
        const data = await response.json();

        if (data.drinks) {
          cocktailList.push(...data.drinks); // Ajouter tous les cocktails trouvés avec cette lettre
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des cocktails avec la lettre ${letter}:`, error);
      }
    }

    setCocktails(cocktailList); // Stocker les cocktails dans l'état
    setLoading(false); // Arrêter le chargement
  };

  // Utilisation de useEffect pour exécuter fetchCocktails une seule fois au montage
  useEffect(() => {
    fetchCocktails();
  }, []);

  // Rendu du composant
   // Rendu du composant
   return (
    <div className="home">
      <div className="hero-section">
        <h1>Liste des cocktails par plusieurs ingrédients</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="Rechercher par ingrédients (ex: vodka, baileys)"
            className="search-input"
          />
          <button type="submit" className="search-button">Rechercher</button>
        </form>

        {loading ? (
          <p>Chargement des cocktails...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cocktails.length > 0 ? (
          <div className="cocktail-flex">
            {cocktails.map((cocktail,index) => (
              <div key={index} className="cocktail-card">
                <Link to={`/cocktail/${cocktail.idDrink}`}>
                  <img
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    className="cocktail-image"
                  />
                  <div className="cocktail-content">
                    <h3 className="cocktail-title">{cocktail.strDrink}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun cocktail trouvé pour ces ingrédients.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
