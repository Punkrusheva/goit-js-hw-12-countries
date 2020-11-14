import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const debounce = require('lodash.debounce');
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
  e.preventDefault();
  const searchQuery = refs.inputEl.value.trim();
  console.log(searchQuery);
  if (searchQuery !== '') {
    API.fetchCountries(searchQuery)
      .then(refs.listEl.innerHTML = '')
      .then(refs.cardContainer.innerHTML = '')
      .then(renderCountryCard)
      .catch(onFetchError)
      .finally(() => { refs.inputEl.value === '' })
  }
}

function renderCountryCard(countries) {
  if (countries.length === 1) {
    refs.cardContainer.innerHTML = countryCardTpl(countries[0]);
  } if (countries.length >= 2 && countries.length <= 10) {
    
    const newListItem = countries.map((country) => {
      const newCountry = document.createElement("li");

      newCountry.textContent = country.name;
      refs.listEl.appendChild(newCountry);

      return newListItem;
    });
  } if (countries.length > 10) {
    click();
  }     
};

function onFetchError(error) {
  clickError();
};

function click() {
  error({
    text:
      "Too many matches found. Pleas enter a more specific query!",
    delay: 700
  });
}

function clickError() {
  error({
    text:
      `"Error, no result found!!"`,
    delay: 700
  });
}