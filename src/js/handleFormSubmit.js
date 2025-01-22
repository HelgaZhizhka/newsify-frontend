const handleFormSubmit = (form, callback, onSuccess = null) => {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!form) return;

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

    if (submitButton) submitButton.disabled = true;

    console.log('Form submission params:', params);

    try {
      // const result = await callback(params);
      if (submitButton) submitButton.disabled = false;
      // if (onSuccess) onSuccess(result);
      // console.log('Form submission result:', result);
      errorTextElement.textContent = '';
    } catch (error) {
      console.error('Error:', error);
      if (submitButton) submitButton.disabled = false;
      errorTextElement.textContent = 'An error occurred. Please try again.';
    }
  });
}

export default handleFormSubmit