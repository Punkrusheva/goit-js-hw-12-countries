fetchCountries(searchQuery)

const r = fetch('https://restcountries.eu/rest/v2/all/').then(data);

console.log(data);