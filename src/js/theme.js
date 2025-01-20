const themeToggle = selector => {
  const currentTheme = localStorage.getItem('theme')
  const themeToggle = document.querySelector(selector)
  const $html = document.documentElement

  if (currentTheme === 'dark') {
    $html.setAttribute('data-theme', 'dark')
    themeToggle.checked = true
  }

  themeToggle.addEventListener('change', () => {
    if ($html.getAttribute('data-theme') === 'dark') {
      $html.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    } else {
      $html.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
  })
}

export default themeToggle
