const renderResults = result => {
  const resultsContainer = document.querySelector('#results')
  const gallery = resultsContainer.querySelector('.gallery')
  const { articles, page } = result

  if (page === 1) {
    gallery.innerHTML = ''
  }

  if (articles && articles.length > 0) {
    const cards = articles
      .map(
        article =>
          `<div class="card">
        <div class="card__image">
          <img class="image" src="${article.urlToImage}" alt="" />
        </div>
        <div class="card__body">
          <span class="card__date">
            <svg class="icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <use href="#icon-datepicker"></use>
            </svg>
            ${article.publishedAt}
          </span>
          <h4 class="card__title">${article.title}</h4>
          <p class="card__description">
            ${article.description}
          </p>
          <div class="card__footer">
            <a href="${article.url}" class="card__link button button_link" target="_blank" rel="noreferrer noopener">
              <span>Read more</span>
              <svg class="icon" width="16" height="16">
                <use href="#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>`,
      )
      .join('')

    gallery.insertAdjacentHTML('beforeend', cards)
  } else {
    const noResultsMessage = document.createElement('h2')
    noResultsMessage.className = 'section__title'
    noResultsMessage.textContent = 'No results found.'
    resultsContainer.appendChild(noResultsMessage)
  }
}

export default renderResults
