export default { fetchCountries };

function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(response =>
        { return response.json(); }
           /* {
            if (response.ok) {
                return response.json();
            }
            if (response.status == 404) {
                throw new Error('Not found');
            }
    throw new Error('Error fetching data');
  }*/
        );
}; 