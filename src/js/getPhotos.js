import fetchPhotos from './api_config';
import refs from './refs';

export default class Cards {
  static axiosParams = {
    params: {
      per_page: 100,
      page: 1,
    },
  };

  static localSettings() {
    localStorage.setItem('gallery', JSON.stringify(this.axiosParams));
  }

  static get clearPage() {
    refs.galleryRef.innerHTML = '';
    refs.loadMoreRef.classList.add('is-hidden');
    console.log('rrr');
  }

  static moreLoad() {
    return this.axiosFetch();
  }
  static async axiosFetch(value = this.axiosParams.params.q) {
    const { params } = this.axiosParams;
    params.q = value;

    return await fetchPhotos(this.axiosParams).then(({ data }) => {
      console.log(data);
      if (!data.totalHits) {
        console.log('err');
        return 'Sorry, there are no images matching your search query. Please try again.';
      }

      if (data.totalHits / params.per_page > params.page) params.page += 1;

      return data.hits;
    });
  }
}
