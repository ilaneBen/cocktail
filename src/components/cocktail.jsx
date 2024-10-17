import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Utilisation du hook useParams pour obtenir l'ID du cocktail

const CocktailDetail = () => {
  const { id } = useParams(); // Récupérer l'ID du cocktail depuis l'URL
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les détails d'un cocktail spécifique
  const fetchCocktailDetail = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();

      if (data.drinks) {
        setCocktail(data.drinks[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error(`Erreur lors de la récupération du cocktail avec l'ID ${id}:`, error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktailDetail();
  }, [id]);

  const getIngredientImageUrl = (ingredient) => {
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
  };

  return (
    <div className="cocktail-detail">
      {loading ? (
        <p>Chargement des détails du cocktail...</p>
      ) : cocktail ? (
        <div className='card-recette1'>
          <h1>{cocktail.strDrink}</h1>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <h3>Catégorie: {cocktail.strCategory}</h3>
          <h3>Type: {cocktail.strAlcoholic}</h3>
          <h3>Instructions</h3>
          <p>{cocktail.strInstructions}</p>
          
          <h3>Ingrédients</h3>
          <ul>
            {Object.keys(cocktail)
              .filter((key) => key.startsWith('strIngredient') && cocktail[key])
              .map((ingredientKey, index) => {
                const ingredient = cocktail[ingredientKey];
                return (
                  <Link to={`/ingredient/${ingredient}`}>
                  <li key={index}>
                    <img
                      src={getIngredientImageUrl(ingredient)}
                      alt={ingredient}
                      style={{ marginRight: '10px' }}
                    />
                    {ingredient} {cocktail[`strMeasure${ingredientKey.slice(13)}`] && ` - ${cocktail[`strMeasure${ingredientKey.slice(13)}`]}`}
                  </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      ) : (
        <p>Aucune information disponible pour ce cocktail.</p>
      )}
    </div>
  );
};

export default CocktailDetail;
