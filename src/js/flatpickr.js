import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
const minDateFromAPI = '2022-01-01'

const initFlatpickr = selector => {
  flatpickr(selector, {
    mode: 'range',
    maxDate: 'today',
    minDate: minDateFromAPI,
    dateFormat: 'Y-m-d',
    locale: {
      firstDayOfWeek: 1,
    },
  })
}

export default initFlatpickr
