import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;
    
    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(()=> form.reset())
};

function renderCountryCard(country) {
    const markup = countryCardTpl(country[0]);
    if (country.length === 1) {
        refs.cardContainer.innerHTML = markup;
    } else if (country.length >= 2 && country.length <= 10) {
        console.log('вот список');
    } else (console.log('to mach'))
};

function onFetchError(error) {
    alert('Ошибка, результат не найден');
};