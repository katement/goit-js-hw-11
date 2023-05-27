import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const lightbox = new SimpleLightbox('.gallery a');
function renderPicture(arr) {
  if (!arr) return;
  //маркап это наша разметка одной карточки с картинкой
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        //разметка
        return `<div class="photo-card">
    <a class="gallery-link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width="240"/></a>
      <div class="info">
        <p class="info-item">
          <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${downloads}</b>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
  //отправляем разметку в гэллэри в хтмл
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
//функция очистки предыдущих результатов
function clearResults() {
  refs.gallery.innerHTML = '';
}
export { renderPicture, clearResults };
