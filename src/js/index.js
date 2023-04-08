import debounce from 'lodash.debounce';
import Cards from './getPhotos.js';

import '../css/styles.css';
import refs from './refs';
import renderHBS from './render';

const handleSearchDebounced = debounce(handleSearch, 500);

refs.formRef.addEventListener('input', handleSearchDebounced);

function handleSearch(e) {
  e.preventDefault();
  const search = e.target.value.trim(); //c debouncу не ребаотет e.cuttentTarget === null
  Cards.clearPage;
  // refs.loadMoreRef.setAttribute('disabled', true);
  console.log(refs.loadMoreRef);
  search && renderHBS(Cards, search);
}

refs.loadMoreRef.addEventListener('click', handleLoadMore);

function handleLoadMore() {
  renderHBS(Cards);
}
