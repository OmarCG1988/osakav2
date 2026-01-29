import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import resultsView from './views/ResultsView.js';
import paginationView from './views/PaginationView.js'; // Importamos la nueva vista 

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    // 1. Renderizar los resultados de la página 1 
    resultsView.render(model.getSearchResultsPage(1));

    // 2. Renderizar los botones de paginación iniciales
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Nueva función para manejar el cambio de página
 */
const controlPagination = function (goToPage) {
  // 1. Renderizar NUEVOS resultados
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Renderizar NUEVOS botones de paginación
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination); // Suscribimos el controlador de paginación
};
init();