import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import hbs from '../li_render.hbs';
import hbs2 from '../item_render.hbs';

const countryListRef = document.querySelector('.country-list');
const countryInfotRef = document.querySelector('.country-info');
const searchQuery = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

searchQuery.addEventListener('input', onSearchInput);

function onSearchInput(e) {
  e.preventDefault();
  const value = e.currentTarget.value.trim();
  const search = debounce(searchFetch, DEBOUNCE_DELAY);
  value && search(value);
}

function searchFetch(name) {
  return fetchCountries(name)
    .then(data => data.json())
    .then(res => {
      if (res.length >= 10)
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );

      if (res.length < 1) throw new Error();

      return res.length !== 1 ? renderList(res) : renderItem(res);
    })
    .catch(err => Notify.failure('Oops, there is no country with that name')); // не могу пробросить err.message
}

function renderList(data) {
  const renderData = data
    .map(el => {
      return hbs(el);
    })
    .join(''); // без join странный вывод
  countryListRef.innerHTML = renderData;
}

function renderItem(data) {
  countryListRef.innerHTML = hbs2(data[0]);
  console.log(data);
}
