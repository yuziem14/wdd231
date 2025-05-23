const DATA_URL = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cardsDOM = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(DATA_URL);
    const data = await response.json();
    /** console.table(data); */
    return data;
}

function displayProphets(prophets = []) {
    cardsDOM.innerHTML = '';
    
    const DEFAULT_PORTRAIT_CONFIG = {
        width: '160px',
        height: 'auto',
        loading: 'lazy'
    }
    prophets.forEach(prophet => {
        const fullName = `${prophet.name} ${prophet.lastname}`;
        const portraitConfig = {
            ...DEFAULT_PORTRAIT_CONFIG,
            src: prophet.imageurl,
            alt: `Portrait of ${fullName}`,
        };

        const cardDOM = document.createElement('section');
        const fullNameDOM = document.createElement('h2');
        fullNameDOM.textContent = fullName;
        const dateOfBirth = document.createElement('p');
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        const placeOfBirth = document.createElement('p');
        placeOfBirth.textContent = `Place Of Birth: ${prophet.birthplace}`;

        const portrait = document.createElement('img');
        Object.keys(portraitConfig).forEach(attr => {
            portrait.setAttribute(attr, portraitConfig[attr]);
        });
    
        cardDOM.classList.add('card');
        [fullNameDOM, dateOfBirth, placeOfBirth, portrait].forEach(element => cardDOM.appendChild(element));

        cardsDOM.appendChild(cardDOM);
    });
}

getProphetData().then(data => {
    displayProphets(data.prophets);
});