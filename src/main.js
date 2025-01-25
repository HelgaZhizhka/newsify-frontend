import './scss/app.scss'
import themeToggle from './js/theme.js'
import handleFormSubmit from './js/handleFormSubmit.js'
import { fetchResults } from './js/api.js'
import renderResults from './js/renderResults.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form')
  const radioButtons = form?.querySelectorAll('input[type="radio"]')

  themeToggle('#themeToggle')

  const showLoader = () => {
    const resultsContainer = document.getElementById('results')
    resultsContainer.innerHTML =
      '<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>'
  }

  if (!form) return

  const divider = document.getElementById('divider')

  let currentPage = 1
  let loading = false;

  const handleIntersection = async entries => {
    if (entries[0].isIntersecting && !loading) {
        loading = true;
        currentPage++;

      try {
        await handleFormSubmit(form, fetchResults, renderResults, currentPage)
      } catch (error) {
        console.error(error)
      }

      loading = false;
    }
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  }
  const observer = new IntersectionObserver(handleIntersection, options)
  observer.observe(divider)

  form.addEventListener('submit', async event => {
    event.preventDefault()
    try {
      showLoader()
      await handleFormSubmit(form, fetchResults, renderResults)
    } catch (error) {
      console.error(error)
    }
  })

  if (radioButtons.length === 0) return

  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        form.dispatchEvent(new Event('submit', { cancelable: true }))
      }
    })
  })
})
