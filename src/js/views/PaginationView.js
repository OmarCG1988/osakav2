import View from './View.js'; // Heredamos de la clase padre
import icons from 'url:../../img/icons.svg'; // Importamos los iconos

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination'); // Selector del contenedor en index.html 

  /**
   * Escucha los clics en los botones usando delegación de eventos
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline'); // Busca el botón más cercano al clic
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // Obtiene el número de página del atributo data-goto
      handler(goToPage); // Llama al controlador con el número de página
    });
  }

  /**
   * Genera el HTML de los botones según la página actual
   */
  _generateMarkup() {
    const curPage = this._data.page; // Página actual
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); // Total de páginas

    // Escenario 1: Página 1 y hay más páginas
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // Escenario 2: Última página
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // Escenario 3: Página intermedia
    if (curPage < numPages) {
      return `
        ${this._generateMarkupButton('prev', curPage)}
        ${this._generateMarkupButton('next', curPage)}
      `;
    }

    // Escenario 4: Página 1 y NO hay más páginas
    return '';
  }

  /**
   * Función auxiliar para crear el HTML de cada botón
   */
  _generateMarkupButton(type, curPage) {
    const goTo = type === 'next' ? curPage + 1 : curPage - 1;
    const icon = type === 'next' ? 'arrow-right' : 'arrow-left';
    
    return `
      <button data-goto="${goTo}" class="btn--inline pagination__btn--${type}">
        ${type === 'next' ? `<span>Page ${goTo}</span>` : ''}
        <svg class="search__icon">
          <use href="${icons}#icon-${icon}"></use>
        </svg>
        ${type === 'prev' ? `<span>Page ${goTo}</span>` : ''}
      </button>
    `;
  }
}

export default new PaginationView(); // Exportamos la instancia