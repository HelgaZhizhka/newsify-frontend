const API_BASE_URL = 'https://newsapi.org/docs/endpoints';

const apiFetch = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
}

export const searchByCategory = (params) => {
  return apiFetch('//top-headlines', 'POST', params);
}

export const searchBySort = (params) => {
  return apiFetch('/everything', 'POST', params);
}

export const fetchCountries = () => {
  //TODO api request to get the list of countries
}

export const fetchSearchKeywords = () => {
  //TODO api request to get the list of search keywords
}