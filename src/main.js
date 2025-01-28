import './scss/app.scss'
import themeToggle from './js/theme.js'
import handleFormSubmit from './js/handleFormSubmit.js'
import { fetchNews } from './js/api.js'
import renderResults from './js/renderResults.js'
import showLoader from './js/showLoader.js'
import hideLoader from './js/hideLoader.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form')
  const radioButtons = form?.querySelectorAll('input[type="radio"]')

  themeToggle('#themeToggle')

  if (!form) return

  let currentPage = 1;
  let loading = false;

  const initObserver = elem => {
    const handleIntersection = async entries => {
      if (entries[0].isIntersecting && !loading) {
        loading = true;
        currentPage += 1;
        await handleSearchForm(currentPage);
        loading = false;
      }
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.75,
    }
    const observer = new IntersectionObserver(handleIntersection, options)
    observer.observe(elem)
  }

  const handleSearchForm = async page => {
    try {
      showLoader();
      await handleFormSubmit(form, fetchNews, renderResults, initObserver, page);
      hideLoader();
    } catch (error) {
      console.error(error);
      hideLoader();
    }
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    handleSearchForm(1);
  })

  if (radioButtons.length === 0) return

  radioButtons.forEach(radio => {
    radio.addEventListener('change', async () => {
      if (radio.checked) {
        handleSearchForm(1);
      }
    })
  })
})
