import './scss/app.scss'
import initFlatpickr from './js/flatpickr.js'
import themeToggle from './js/theme.js'
import { searchByCategory, searchBySort } from './js/api.js';
import handleFormSubmit from './js/handleFormSubmit.js'
import renderResults from './js/renderResults.js'

document.addEventListener('DOMContentLoaded', () => {
  const formSearch = document.getElementById('search-form');
  const formHeadlines = document.getElementById('search-headlines');
  const resultsContainer = document.getElementById('results');
  const buttonResetDatePicker = document.getElementById('reset-datepicker');
  const inputDatepicker = document.getElementById('datepicker');

  themeToggle('#themeToggle')

  const showLoader = () => {
    resultsContainer.innerHTML = '<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>';
  };

  const hide = (element) => {
    element.style.display = 'none';
  };

  const show = (element) => {
    element.style.display = 'block';
  }

  if (formHeadlines) {
    handleFormSubmit(formHeadlines, async (params) => {
      showLoader();
      return await searchByCategory(params);
    }, renderResults);
    const radioButtons = formHeadlines.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          if (radio.checked) {
            formHeadlines.dispatchEvent(new Event('submit', { cancelable: true }));
          }
        }
      });
    });
  }

  if (formSearch) {
    hide(buttonResetDatePicker);
    initFlatpickr(inputDatepicker)
    handleFormSubmit(formSearch, async (params) => {
      showLoader();
      return await searchBySort(params);
    }, renderResults);
    buttonResetDatePicker.addEventListener('click', (event) => {
      event.preventDefault();
      const datepicker = document.getElementById('datepicker');
      datepicker._flatpickr.clear();
      hide(buttonResetDatePicker);
    });
    inputDatepicker.addEventListener('change', () => {
      if (inputDatepicker.value) {
        show(buttonResetDatePicker);
      }
    });
    const radioButtons = formSearch.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          if (radio.checked) {
            formSearch.dispatchEvent(new Event('submit', { cancelable: true }));
          }
        }
      });
    });
  }

})
