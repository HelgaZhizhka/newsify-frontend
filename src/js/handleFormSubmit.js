const handleFormSubmit = async (form, callback, onSuccess = null, page = 1) => {
    let articles = [];
    const limit = 9;
    let totalResults = null;
    const submitButton = form.querySelector('[type="submit"]');
    const errorTextElement = form.querySelector('#search-form-error');
    const formData = new FormData(form);
    const params = Object.fromEntries(formData.entries());

    if (form.name === 'searchTopHeadlinesForm') {
      const keyword = params.q && params.q.trim();
      const country = params.country && params.country.trim();

      if (!keyword && !country) {
        errorTextElement.textContent = 'Please enter a keyword or country.';
        return
      }

    } else if (form.name === 'searchForm') {
      const keyword = params.q && params.q.trim();
      const date = params.date && params.date.trim();

      if (!keyword && !date) {
        errorTextElement.textContent = 'Please enter a keyword or date range.';
        return;
      }

      if (date) {
        const [startDate, endDate] = date.split(' to ');
        params.from = startDate;
        params.to = endDate ?? '';
      }

      delete params.date;
    }
    params.page = page;

    if (submitButton) submitButton.disabled = true;

    console.log('Form submission params:', params);

    // пункт 1: пропускаем проверки и делаем запрос
    // иначе -> провверяем
    // если totalResults = aricles.length -> return
    // когда очистить эти данные???

    try {
      const result = await callback(params);
      articles.push(result.articles);
      totalResults = result.totalResults;
      if (submitButton) submitButton.disabled = false;
      if (onSuccess) onSuccess(result);
      console.log('Form submission result:', result);
      errorTextElement.textContent = '';
    } catch (error) {
      console.error('Error:', error);
      if (submitButton) submitButton.disabled = false;
      errorTextElement.textContent = 'An error occurred. Please try again.';
    }
}

export default handleFormSubmit