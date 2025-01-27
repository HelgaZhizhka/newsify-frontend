let isEnd = false
const limit = 10;

const handleFormSubmit = async (form, callback, onSuccess = null, initObserver = null, page = 1) => {

  if (page === 1) {
    isEnd = false
  } else if (isEnd || page*limit > 100 ) {
    console.log('All articles have been loaded.');
    return;
  }

  let url = ''
  const submitButton = form.querySelector('[type="submit"]')
  const errorTextElement = form.querySelector('#search-form-error')
  const formData = new FormData(form)
  const params = Object.fromEntries(formData.entries())

  if (form.name === 'searchTopHeadlinesForm') {
    url = '/submit-form-headlines/'
    const keyword = params.q && params.q.trim()
    const country = params.country && params.country.trim()

    if (!keyword && !country) {
      errorTextElement.textContent = 'Please enter a keyword or country.'
      return
    }
  } else if (form.name === 'searchForm') {
    url = '/submit-form/'
    const keyword = params.q && params.q.trim()
    const date = params.date && params.date.trim()

    if (!keyword && !date) {
      errorTextElement.textContent = 'Please enter a keyword or date range.'
      return
    }

    if (date) {
      const [startDate, endDate] = date.split(' to ')
      params.from = startDate
      params.to = endDate ?? ''
    }

    delete params.date
  }

  params.page = page;

  submitButton.disabled = true

  try {
    const result = await callback(params, url)
    const { articles, terminate } = result
    submitButton.disabled = false
    isEnd = terminate
    if (!isEnd) {
      if (onSuccess && result) onSuccess(result)
      const lastCard  = document.querySelector('.card:last-child');
      setTimeout(() => {if(initObserver) initObserver(lastCard)}, 100)
      errorTextElement.textContent = ''
    }
  } catch (error) {
    console.error('Error:', error)
    submitButton.disabled = false
    errorTextElement.textContent = 'An error occurred. Please try again.'
  }
}

export default handleFormSubmit
