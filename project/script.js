const buttonNext = document.querySelector('.icon-arrow-down');
const aboutButton = document.querySelector('.about');
const skillsButton = document.querySelector('.skills');
const workButton = document.querySelector('.work');
const trainingButton = document.querySelector('.training');
const mainContent = document.querySelector('.main-content');

buttonNext.addEventListener('click', loadFile);
aboutButton.addEventListener('click', () => loadFile(aboutRoute));
skillsButton.addEventListener('click', () => loadFile(skillsRoute));
workButton.addEventListener('click', () => loadFile(workRoute));
trainingButton.addEventListener('click', () => loadFile(trainingRoute));

const aboutRoute = './components/about.html';
const skillsRoute = './components/skills.html';
const workRoute = './components/work.html'; 
const trainingRoute = './components/training.html';

function loadFile(ruta) {
    fetch(ruta)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newMainContent = doc.querySelector('main');
            const currentMainContent = document.querySelector('.main-content');

            currentMainContent.classList.add('hide');

            setTimeout(() => {
                currentMainContent.innerHTML = newMainContent.innerHTML;

                setTimeout(() => {
                    currentMainContent.classList.remove('hide');
                }, 50);
            }, 500);

        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
        });
};

let totalScrollDown = 0;
let scrollDirection = 0; // 1 indica scroll hacia abajo, -1 indica scroll hacia arriba

window.addEventListener('wheel', scrollDownContent);

function scrollDownContent(event) {
    if (event.deltaY > 0) {
        if (scrollDirection === -1) {
            totalScrollDown = 0; // Reinicia el conteo si hubo un cambio de dirección
        }
        totalScrollDown += event.deltaY;
        scrollDirection = 1;
    } else {
        scrollDirection = -1;
    }

    if (totalScrollDown >= 720) { // 360 es un valor arbitrario para media vuelta de scroll
        
        fetch('./about/about.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            console.log('parser', parser);
            const aboutDocument = parser.parseFromString(html, 'text/html');
            console.log('aboutDocument', aboutDocument);
            const aboutMain = aboutDocument.querySelector('main.section-content');
            console.log('aboutMain', aboutMain);
            const aboutMainClass = aboutMain.getAttribute('class');

            mainContent.innerHTML = aboutMain.innerHTML;
            mainContent.className = aboutMainClass;
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
        });
        totalScrollDown = 0;
        scrollDirection = 0;
    }
};

