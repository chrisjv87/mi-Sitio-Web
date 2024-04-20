const homeButton = document.querySelector('#home');
const aboutButton = document.querySelector('#about');
const skillsButton = document.querySelector('#skills');
const workButton = document.querySelector('#work');
const trainingButton = document.querySelector('#training');
const mainContent = document.querySelector('#main-content');
const buttons = document.querySelectorAll('.buttonMenu');
const darkMode = document.querySelector('#dark-mode');
const languageButton = document.querySelector('#language'); 

homeButton.addEventListener('click', () => routeValidation(indexRoute));
aboutButton.addEventListener('click', () => routeValidation(aboutRoute));
skillsButton.addEventListener('click', () => routeValidation(skillsRoute));
workButton.addEventListener('click', () => routeValidation(workRoute));
trainingButton.addEventListener('click', () => routeValidation(trainingRoute));

const indexRoute = './index.html';
const aboutRoute = './components/about.html';
const skillsRoute = './components/skills.html';
const workRoute = './components/work.html';
const trainingRoute = './components/training.html';


function routeValidation(routeFile) {
    if(routeFile !== indexRoute) {
        loadFile(routeFile);
    } else {
        loadFile(routeFile)
        ressetButtonsColor();
    }
};

function loadFile(routeFile) {
    const currentSection = mainContent.getAttribute('id');

    fetch(routeFile)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const htmlFile = parser.parseFromString(html, 'text/html');
            const mainLabel = htmlFile.querySelector('main');
            const mainGetId = mainLabel.getAttribute('id');

            if(currentSection === mainGetId) {
                return;
            }

            mainContent.classList.add('hide');

            setTimeout(() => {
                mainContent.id = mainGetId;
                mainContent.innerHTML = mainLabel.innerHTML;

                setTimeout(() => {
                    mainContent.classList.remove('hide');
                }, 50);
            }, 500);

        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
        });
};

// Restablecer el color de los botones cuando se cambia al home.
function ressetButtonsColor() {
    buttons.forEach(btn => {
        btn.classList.remove('active')
    });
}

// Borra clase active en todos los botones y agrega active en el presionado.
buttons.forEach(button => {
    button.addEventListener('click', () => {
        ressetButtonsColor();
        button.classList.add('active');
    });
});

// Cambiar idioma de la pagina.

languageButton.addEventListener('click', () => toggleLanguage());

let translations;
let currentLanguage = 'es'; // Define currentLanguage aquí

const translationsUrl = './locales/translations.json';

const loadTranslations = async () => {
    try {
        const response = await fetch(translationsUrl);
        const translationsData = await response.json();
        translations = translationsData;

        console.log('translationsLoad', translations);


        // Llamamos a updateTranslations() después de cargar las traducciones
        updateTranslations();

    } catch (error) {
        console.error('Error al cargar las traducciones', error);
    }
};


const toggleLanguage = () => {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updateTranslations();
}

const updateTranslations = () => {
    const elementsToUpdate = document.querySelectorAll('[data-translate]');
    console.log('elementsToUpdate', elementsToUpdate);
    elementsToUpdate.forEach(element => {
        console.log('element', element);
        const key = element.dataset.translate;
        const value = translations[key];
        console.log('key', key);
        console.log('translationsUPdate', translations);
        console.log('value', value);
        if (translations) {
            const translatedText = translations.index.text.en; 
            console.log('translatedText', translatedText);
            element.textContent = translatedText || '';
            console.log('element.textContent', element.textContent);
        } else {
            console.error('Error: Traducciones no cargadas correctamente.');
        }

    });
};

window.addEventListener('DOMContentLoaded', loadTranslations);
