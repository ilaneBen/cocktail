import React, { useState, useEffect } from 'react';
import '../assets/css/cocktail.css'; // Assure-toi de créer et d'importer le fichier CSS

const Home = () => {
  const [cocktails, setCocktails] = useState([]); // Pour stocker les cocktails récupérés
  const [loading, setLoading] = useState(true); // Pour indiquer le chargement des données

  // Liste des lettres à utiliser pour rechercher les cocktails
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

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
  return (
    <div className="home">
      <div className="hero-section">
                      <h1>Liste des cocktails</h1>

        {loading ? (
          <p>Chargement des cocktails...</p>
        ) : (
          <div className="cocktail-grid">
            {cocktails.map((cocktail) => (
              <div key={cocktail.idDrink} className="cocktail-card">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
                <div className="cocktail-content">
                  <h3 className="cocktail-title">{cocktail.strDrink}</h3>
                  <p className="cocktail-instructions">{cocktail.strInstructions}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
