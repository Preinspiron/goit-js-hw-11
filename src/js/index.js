import debounce from 'lodash.debounce';
import Cards from './getPhotos.js';

import '../css/styles.css';
import refs from './refs';
import renderHBS from './render';

import Pagination from 'tui-pagination';
import('tui-pagination/dist/tui-pagination.min.css');

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {});

const handleSearchDebounced = debounce(handleSearch, 500);

refs.formRef.addEventListener('input', handleSearchDebounced);

function handleSearch(e) {
  e.preventDefault();
  const search = e.target.value.trim(); //c debouncу не ребаотет e.cuttentTarget === null
  Cards.clearPage;
  search && renderHBS(Cards, search);
}

refs.loadMoreRef.addEventListener('click', handleLoadMore);

function handleLoadMore() {
  if (Cards.isItLastPage()) {
    Cards.locals.flag = false;
  }

  const resp = renderHBS(Cards);
}
