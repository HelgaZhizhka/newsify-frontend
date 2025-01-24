import './scss/app.scss'
import themeToggle from './js/theme.js'
import handleFormSubmit from './js/handleFormSubmit.js'
import { fetchSearchForm, fetchSearchHeadlinesForm } from './js/api.js'
import renderResults from './js/renderResults.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const radioButtons = form?.querySelectorAll('input[type="radio"]');

  themeToggle('#themeToggle')

  const showLoader = () => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>';
  };

  if (!form) return;

  if (form.name === 'searchForm') {
    handleFormSubmit(form, fetchSearchForm, renderResults);
  } else if (form.name === 'searchTopHeadlinesForm') {
    handleFormSubmit(form, fetchSearchHeadlinesForm, renderResults);
  }

  if (radioButtons.length === 0) return;

  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
          form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
    });
  });
})
