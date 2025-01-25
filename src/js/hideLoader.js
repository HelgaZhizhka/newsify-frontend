const hideLoader = () => {
  const resultsContainer = document.querySelector('.section__loader')
  resultsContainer.innerHTML = ''
}

export default hideLoader