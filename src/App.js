import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import CocktailDetail from './components/cocktail';
import RecetteIngredient from './components/ingredient';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail/:id" element={<CocktailDetail />} /> {/* Route pour la page de détail du cocktail */}
   {/* Route pour afficher les recettes liées à un ingrédient */}
       <Route path="/ingredient/:name" element={<RecetteIngredient />} />
        {/* Ajoutez d'autres routes ici */}
        {/* <Route path="/autre-page" element={<AutrePage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
