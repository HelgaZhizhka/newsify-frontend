import './scss/app.scss'
import themeToggle from './js/theme.js'
import handleFormSubmit from './js/handleFormSubmit.js'
import { searchByCategory } from './js/api.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const radioButtons = form?.querySelectorAll('input[type="radio"]');

  themeToggle('#themeToggle')

  const showLoader = () => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>';
  };

  if (!form) return;

  handleFormSubmit(form, async (params) => {
    showLoader();
    return await searchByCategory(params);
  }, (result) => console.log(result));

  if (radioButtons.length === 0) return;

  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        if (radio.checked) {
          form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      }
    });
  });
})
