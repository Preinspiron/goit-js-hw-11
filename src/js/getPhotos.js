import fetchPhotos from './api_config';
import refs from './refs';

export default class Cards {
  static axiosParams = {
    params: {
      per_page: 40,
      page: 1,
    },
  };
  static locals = {
    totalHits: 0,
    flag: true,
  };
  static localSettings() {
    localStorage.setItem('gallery', JSON.stringify(this.axiosParams));
  }

  static get clearPage() {
    refs.galleryRef.innerHTML = '';
    refs.loadMoreRef.classList.add('is-hidden');
    refs.loadMoreRef.disabled = false;
    refs.loadMoreRef.textContent = 'Load';

    this.axiosParams.params.page = 1;
    this.locals.flag = true;
  }

  static isItLastPage() {
    const { params } = this.axiosParams;
    return this.locals.totalHits <= params.per_page * params.page;
  }

  static moreLoad() {
    return this.axiosFetch();
  }
  static async axiosFetch(value = this.axiosParams.params.q) {
    const { params } = this.axiosParams;
    params.q = value;

    return await fetchPhotos(this.axiosParams).then(({ data }) => {
      if (!data.hits.length) {
        return 'Sorry, there are no images matching your search query. Please try again.';
      }

      if (data.totalHits / params.per_page > params.page) params.page++;
      this.locals.totalHits = data.totalHits;
      return data.hits;
    });
  }
}
