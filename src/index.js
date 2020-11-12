import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
//import searchList from './templates/country-search-result-list.hbs'
import API from './fetchCountries';
import getRefs from './get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);
//refs.searchForm.addEventListener('input', _.debounce(onSearch), 500);

function onSearch(e) {
    e.preventDefault();

    
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;
    
    API.fetchCountries(searchQuery)
        .then(refs.listEl.innerHTML = '')
        .then(refs.cardContainer.innerHTML = '')
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => { form.reset() })
};

function renderCountryCard(countries) {
   if (countries.length === 1) {
        refs.cardContainer.innerHTML = countryCardTpl(countries[0]);
        } else if (countries.length >= 2 && countries.length <= 10) {
            console.log('вот список до 10 стран');
            const newListItem = countries.map((country) => {
                const newCountry = document.createElement("li");
                newCountry.textContent = country.name;
                refs.listEl.appendChild(newCountry);
                return newListItem;
            });
        } else if (countries.length > 10) { (console.log('to mach')) }
};

function onFetchError(error) {
        alert('Ошибка, результат не найден');
        console.log(error);
};