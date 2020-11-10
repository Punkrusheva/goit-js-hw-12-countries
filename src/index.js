import './styles.css';
import countryCardTpl from './templates/country-card.hbs'

//fetchCountries(searchQuery)

const refs = {
    cardContainer: document.querySelector('.js-card-container')
}

fetchCountryByName()
    .then(renderCountryCard)
    .catch(error => console.log(error));

function fetchCountryByName() {
    return fetch('https://restcountries.eu/rest/v2/name/g')
        .then(response => {
            return response.json();
        });
};

function renderCountryCard(country) {
    const markup = countryCardTpl(country[0]);
        refs.cardContainer.innerHTML = markup;
};
