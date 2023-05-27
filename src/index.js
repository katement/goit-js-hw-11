import { refs } from './partials/js/refs';
import { renderPicture, clearResults } from './partials/js/rendering';
import { fetchPictures } from './partials/js/api';
import Notiflix from 'notiflix';
refs.input.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onLoadMore);
let searchQuery = '';
let currentPage = 1;
async function onLoadMore() {
  currentPage += 1;
  try {
    const { hits, totalHits } = await fetchPictures(searchQuery, currentPage);
    renderPicture(hits);
    if (hits.length < 40) {
      hideButton();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    showButton();
  } catch (error) {
    Notiflix.Notify.warning(`Warning!${error.message}`);
  }
}
async function onSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  clearResults();
  searchQuery = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (searchQuery === '') {
    return Notiflix.Notify.info(
      'Please, enter the information you are looking for.'
    );
  }

  try {
    const { hits, totalHits } = await fetchPictures(searchQuery, currentPage);
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderPicture(hits);
    if (hits.length < 40) {
      hideButton();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else showButton();
  } catch (error) {
    Notiflix.Notify.warning(`Warning!${error.message}`);
  }
}
function showButton() {
  refs.btn.classList.remove('is-hidden');
}
function hideButton() {
  refs.btn.classList.add('is-hidden');
}
