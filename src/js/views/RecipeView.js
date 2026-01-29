import View from './View.js'; // Importamos la clase padre 
import icons from 'url:../../img/icons.svg'; // Importación de iconos para Parcel 
import { Fraction } from 'fractional'; // Librería para mostrar fracciones (ej. 1/2) 

class RecipeView extends View {
  // Propiedades protegidas (usando _ por compatibilidad) 
  _parentElement = document.querySelector('.recipe'); // Elemento donde se renderiza la receta 
  _errorMessage = 'We could not find that recipe. Please try another one!!'; // Mensaje de error 
  _message = '';

  /**
   * Método para escuchar los eventos de carga y cambio de hash (ID)
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * Genera el HTML principal de la receta usando template strings
   * Sustituye los datos estáticos por los del objeto _data
   */
  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>
        </div>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  /**
   * Genera el HTML para cada ingrediente individual
   * Aplica la librería fractional para las cantidades 
   */
  _generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">
          ${ing.quantity ? new Fraction(ing.quantity).toString() : ''}
        </div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `;
  }
}

// Exportamos la instancia de la clase
export default new RecipeView();