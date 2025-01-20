const renderResults = (result) => {
  const resultsContainer = document.querySelector('#results .gallery');
  resultsContainer.innerHTML = '';

  if (result.articles && result.articles.length > 0) {
    resultsContainer.innerHTML = result.articles.map(article => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = ``
      resultsContainer.appendChild(card);
    });
  } else {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'section__content';
    noResultsMessage.textContent = 'No results found.';
    resultsContainer.appendChild(noResultsMessage);
  }
};

export default renderResults;