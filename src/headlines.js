document.addEventListener('DOMContentLoaded', () => {
  const buttonReset = document.getElementById('button-reset');
  const selectCountry =document.getElementById('search-country');

  buttonReset.style.display = 'none';

  selectCountry.addEventListener('change', () => {
    if (selectCountry.value) {
      buttonReset.style.display = 'block';
    }
  });

  buttonReset.addEventListener('click', (event) => {
    event.preventDefault();
    selectCountry.value = '';
    buttonReset.style.display = 'none';
  });
})
