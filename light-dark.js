const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const darkLightTheme = ['dark', 'light'];

// function imageMode(color) {
//     image1.src = `img/undraw_proud_coder_${color}.svg`;
//     image2.src = `img/undraw_feeling_proud_${color}.svg`;
//     image3.src = `img/undraw_conceptual_idea_${color}.svg`;
// }

    lightDarkMode = (isDark) => {
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    if (isDark) {
        toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
        // imageMode(darkLightTheme[0])
      } else {
        toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun')
        // imageMode(darkLightTheme[1])
      }
}

function switchTheme(e) {
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

toggleSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        lightDarkMode(true);
    }
}