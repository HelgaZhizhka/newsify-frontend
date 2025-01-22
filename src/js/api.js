const getCookie = name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log('cookie: '+cookieValue)
    return cookieValue;
}

const apiFetch = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken': getCookie('csrftoken'),
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
}

export const fetchSearchForm = (params) => {
  return apiFetch('/submit-form/', 'POST', params);
}