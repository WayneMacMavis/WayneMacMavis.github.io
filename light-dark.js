const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const darkLightTheme = ['dark', 'light'];
const currentTheme = localStorage.getItem('theme');

    lightDarkMode = (isDark) => {
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    if (isDark) {
        toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
      } else {
        toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun')
      }
}

    switchTheme = (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        lightDarkMode(darkLightTheme[0]);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightDarkMode(!darkLightTheme[1]);
    }
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        lightDarkMode(true);
    }
}

toggleSwitch.addEventListener('change', switchTheme);