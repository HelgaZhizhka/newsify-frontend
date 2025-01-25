const showLoader = () => {
  const resultsContainer = document.querySelector('.section__loader')
  resultsContainer.innerHTML =
    '<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>'
}

export default showLoader