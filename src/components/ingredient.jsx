import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Utilisation du hook useParams pour obtenir l'ingrédient

const RecetteIngredient = () => {
  const { name } = useParams(); // Récupérer le nom de l'ingrédient depuis l'URL
  const [cocktails, setCocktail] = useState([]); // Tableau pour stocker les cocktails liés à l'ingrédient
  const [loading, setLoading] = useState(true);

    const fetchRecetteIngredient = async () => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);

      console.log(response)
          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`); // Erreur HTTP
          }
      
          const data = await response.json();
      
          // Vérifier que la réponse contient bien des cocktails
          if (data && data.drinks) {
            setCocktail(data.drinks);
          } else {
            console.error('Aucun cocktail trouvé pour cet ingrédient');
          }
          setLoading(false);
        } catch (error) {
          console.error(`Erreur lors de la récupération des recettes pour l'ingrédient ${name}:`, error);
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchRecetteIngredient();
      }, [name]);
      
  return (
    <div className="cocktail-detail">
      {loading ? (
        <p>Chargement des recettes liées à l'ingrédient...</p>
      ) : cocktails.length > 0 ? (
        <div className="cocktail-list">
          <h1>Recettes contenant : {name}</h1>
          <div className="cocktail-flex">
            {cocktails.map((cocktail) => (
              <div key={cocktail.idDrink} className="cocktail-item">
                <Link to={`/cocktail/${cocktail.idDrink}`}>
                  <img  className="cocktail-image" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                  <h3 className='cocktail-title'>{cocktail.strDrink}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Aucune recette trouvée pour cet ingrédient.</p>
      )}
    </div>
  );
};

export default RecetteIngredient;
