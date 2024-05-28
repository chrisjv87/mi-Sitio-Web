const homeButton = document.querySelector('#home');
const aboutButton = document.querySelector('#about');
const skillsButton = document.querySelector('#skills');
const workButton = document.querySelector('#work');
const trainingButton = document.querySelector('#training');
const mainContent = document.querySelector('#main-content');
const darkMode = document.querySelector('#dark-mode');
const buttons = document.querySelectorAll('.buttonMenu');
const languageButton = document.getElementById('language');
const textsToChange = document.querySelectorAll('[data-section]')
let currentLanguage = 'es';


homeButton.addEventListener('click', () => routeValidation(indexRoute));
aboutButton.addEventListener('click', () => routeValidation(aboutRoute));
skillsButton.addEventListener('click', () => routeValidation(skillsRoute));
workButton.addEventListener('click', () => routeValidation(workRoute));
trainingButton.addEventListener('click', () => routeValidation(trainingRoute));
languageButton.addEventListener('click', toogleLanguage);

const indexRoute = './index.html';
const aboutRoute = './components/about.html';
const skillsRoute = './components/skills.html';
const workRoute = './components/work.html';
const trainingRoute = './components/training.html';


function routeValidation(route) {
    if(route !== indexRoute) {
        loadFile(route);
    } else {
        loadFile(route)
        ressetButtonsColor();
    }
};

const changeContent = (texts) => {
    const elements = document.querySelectorAll('[data-section]');
    
    elements.forEach(element => {
        const section = element.getAttribute('data-section');
        const value = element.getAttribute('data-value');
        if(texts[section] && texts[section][value]) {
            element.innerHTML = texts[section][value];
        }
    });
}

function loadFile(file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const htmlFile = parser.parseFromString(html, 'text/html');
            const mainLabel = htmlFile.querySelector('main');
            mainGetId = mainLabel.id;

            if (!mainLabel) {
                throw new Error(`No se encontro la etiqueta <main> en el archivo ${html} cargado`);
            }
        
            mainContent.classList.add('hide');
            mainContent.innerHTML = mainLabel.innerHTML;
            
            setTimeout(() => {
                mainContent.classList.remove('hide');
            }, 300);
                
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
        })
};



// Restablecer el color de los botones cuando se cambia al home.
function ressetButtonsColor() {
    buttons.forEach(btn => {
        btn.classList.remove('active');
        });
    changeLanguage(currentLanguage);

}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        ressetButtonsColor();
        
        button.classList.add('active'); 
        currentLanguage = languageButton.dataset.language;
        
        changeLanguage(currentLanguage);
    });
});

// Cambiar idioma de la pagina.

function toogleLanguage() {
    const currentLanguage = localStorage.getItem('language');
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    languageButton.setAttribute('data-language', newLanguage);
    localStorage.setItem('language', newLanguage);
    
    changeLanguage(newLanguage);
}

const changeLanguage = async (lang) => {
    const requestJson = await fetch(`./locales/${lang}.json`);
    const texts = await requestJson.json();
    
    changeContent(texts)
};

window.addEventListener('DOMContentLoaded', () => {
    
    loadFile(`${indexRoute}`); // Cargar el archivo inicial
});

