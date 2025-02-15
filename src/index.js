import initFlatpickr from './js/flatpickr.js'

document.addEventListener('DOMContentLoaded', () => {
  const buttonReset = document.getElementById('button-reset')
  const inputDatepicker = document.getElementById('datepicker')

  if (!inputDatepicker) return

  initFlatpickr(inputDatepicker)

  if (!buttonReset) return

  buttonReset.style.display = 'none'

  inputDatepicker.addEventListener('change', () => {
    if (inputDatepicker.value) {
      buttonReset.style.display = 'block'
    }
  })

  buttonReset.addEventListener('click', event => {
    event.preventDefault()
    inputDatepicker._flatpickr.clear()
    buttonReset.style.display = 'none'
  })
})
