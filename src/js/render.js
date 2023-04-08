import refs from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import cards from '../hbs/cards.hbs';

Notify.init({
  width: '500px',
  height: '500px',
  position: 'center-center',
});

export default async function renderHBS(callback, query) {
  Loading.standard(1000);
  const arr = await callback
    .axiosFetch(query)
    .then(res => {
      if (typeof res === 'string') {
        console.log(111);
        Notify.info(res);
        Loading.remove();
        callback.clearPage;
        return [];
      }
      refs.loadMoreRef.classList.remove('is-hidden');
      return res;
    })
    .catch(console.log);
  refs.galleryRef.insertAdjacentHTML('beforeend', cards(arr));
  let box = new SimpleLightbox('.gallery a');
  const promises = await arr.map(item => {
    return Promise.resolve(item);
  });
  const prerender = Promise.all(promises).then(() => {
    Loading.remove(1000);
  });
}

function moreLoad() {
  // Cards.moreLoad().then(console.log);
}

refs.loadMoreRef.addEventListener('click', moreLoad);
