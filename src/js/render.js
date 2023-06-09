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
        Notify.info(res);
        Loading.remove();
        callback.clearPage;
        return [];
      }
      refs.loadMoreRef.classList.remove('is-hidden');
      return res;
    })
    .catch(err => Notify.info(err.message));

  const promises = await arr.map(async item => {
    return await Promise.resolve(item);
  });

  const prerender = await Promise.all(promises).then(res => {
    Loading.remove();
    if (callback.isItLastPage()) {
      refs.loadMoreRef.textContent = 'No more avaible content';
    }
    if (!callback.locals.flag) {
      Notify.info('No more avaible content');
      refs.loadMoreRef.disabled = true;
      return;
    }
    return res;
  });

  refs.galleryRef.insertAdjacentHTML('beforeend', cards(prerender));
  let box = new SimpleLightbox('.gallery a');
  return callback.isItLastPage();
}
