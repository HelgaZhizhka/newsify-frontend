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

  const divider = document.getElementById("divider");

  let page = 1;
  const loadMoreResults = () => {
    page += 1;
    if (form.name === 'searchForm') {
      handleFormSubmit(form, fetchSearchForm, renderResults, page);
    } else if (form.name === 'searchTopHeadlinesForm') {
      handleFormSubmit(form, fetchSearchHeadlinesForm, renderResults);
    }
  }

  const handleIntersection = entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
         //console.log(entry.isIntersecting);
         loadMoreResults();
         console.log(page);
      }
    })
  }

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(divider);

  if (form.name === 'searchForm') {
    form.addEventListener('submit', event => {
      event.preventDefault();
      handleFormSubmit(form, fetchSearchForm, renderResults);
    });
  } else if (form.name === 'searchTopHeadlinesForm') {
    form.addEventListener('submit', event => {
      event.preventDefault();
      handleFormSubmit(form, fetchSearchHeadlinesForm, renderResults);
    });
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
