let loadedArticlesCount = 0
let totalArticlesCount = 0

const handleFormSubmit = async (form, callback, onSuccess = null, page = 1) => {

  if (page === 1) {
    loadedArticlesCount = 0;
    totalArticlesCount = 0;
  } else if (loadedArticlesCount >= totalArticlesCount && totalArticlesCount > 0) {
    console.log('All articles have been loaded.');
    return;
  }
  console.log(totalArticlesCount, loadedArticlesCount);
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

  console.log('Form submission params:', params)

  try {
    const result = await callback(params, url)
    const { articles, totalResults } = result
    loadedArticlesCount += articles.length
    totalArticlesCount = totalResults
    submitButton.disabled = false
    if (onSuccess && result) onSuccess(result)
    console.log('Form submission result:', result)
    errorTextElement.textContent = ''
  } catch (error) {
    console.error('Error:', error)
    submitButton.disabled = false
    errorTextElement.textContent = 'An error occurred. Please try again.'
  }
}

export default handleFormSubmit
