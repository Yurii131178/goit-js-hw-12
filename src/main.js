// import { getImagesByQuery } from './js/pixabay-api.js';
// import {
//   createGallery,
//   clearGallery,
//   showLoader,
//   hideLoader,
//   showLoadMoreButton,
//   hideLoadMoreButton,
// } from './js/render-functions.js';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const form = document.querySelector('.form');
// const loadMoreBtn = document.querySelector('.load-more');

// let currentPage = 1;
// let currentQuery = '';
// let totalHits = 0;

// form.addEventListener('submit', handleFormSubmit);
// loadMoreBtn.addEventListener('click', handleLoadMoreClick);

// async function handleFormSubmit(e) {
//   e.preventDefault();
//   const searchQuery = form.elements['text'].value.trim();

//   if (!searchQuery) return;

//   currentQuery = searchQuery;
//   currentPage = 1;
//   clearGallery();
//   hideLoadMoreButton();
//   showLoader();

//   try {
//     const data = await getImagesByQuery(currentQuery, currentPage);
//     totalHits = data.totalHits;

//     if (data.hits.length === 0) {
//       iziToast.warning({ message: 'No images found. Try again!', position: 'topRight' });
//       return;
//     }

//     createGallery(data.hits);

//     if (currentPage * 15 < totalHits) {
//       showLoadMoreButton();
//     }

//   } catch (error) {
//     iziToast.error({ message: error.message, position: 'topRight' });
//   } finally {
//     hideLoader();
//   }
// }

// async function handleLoadMoreClick() {
//   currentPage += 1;
//   showLoader();
//   hideLoadMoreButton();

//   try {
//     const data = await getImagesByQuery(currentQuery, currentPage);
//     createGallery(data.hits);

//     const totalPages = Math.ceil(totalHits / 15);
//     if (currentPage >= totalPages) {
//       iziToast.info({
//         message: "We're sorry, but you've reached the end of search results.",
//         position: 'topRight',
//       });
//     } else {
//       showLoadMoreButton();
//     }

//     scrollToNewImages();
//   } catch (error) {
//     iziToast.error({ message: error.message, position: 'topRight' });
//   } finally {
//     hideLoader();
//   }
// }

// function scrollToNewImages() {
//   const card = document.querySelector('.gallery__item');
//   if (card) {
//     const { height: cardHeight } = card.getBoundingClientRect();
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   }
// }

import { getImagesByQuery } from './js/pixabay-api.js';

import { createGallery } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

function showToast({ title = 'Oops!', message = '', color = 'red' }) {
  iziToast.show({
    title,
    titleColor: 'white',
    message,
    messageColor: 'white',
    color,
    position: 'topCenter',
    timeout: 5000,
  });
}

const form = document.querySelector('.form');
const loader = document.querySelector('.loader-text');

const photoGallery = document.querySelector('.gallery');

const buttonMore = document.querySelector('.buttonMore');

const book = new SimpleLightbox('.card .place-for-image a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', handleSearch);
buttonMore.addEventListener('click', searchMore);

let page = 1;
let searchWord;

async function handleSearch(event) {
  event.preventDefault();
  buttonMore.hidden = true;
  photoGallery.innerHTML = '';
  loader.hidden = false;

  searchWord = event.currentTarget.elements.inputSearch.value.trim();

  if (searchWord === '') {
    showToast({ message: 'No images found. Try another query.' });
    loader.hidden = true;
    return;
  }

  page = 1;

  try {
    const data = await getImagesByQuery(searchWord, page);

    if (data.total === 0) {
      iziToast.show({
        title: 'Oops!',
        titleColor: 'white',
        message: 'No images found. Try another query.',
        messageColor: 'white',
        color: 'red',
        position: 'topCenter',
        timeout: 5000,
      });
      return;
    }

    buttonMore.hidden = false;
    photoGallery.insertAdjacentHTML('beforeend', createGallery(data.data));
    book.refresh();
    event.target.reset();
    page += 1;

    if (photoGallery.children.length >= data.data.totalHits) {
      buttonMore.hidden = true;
      showToast({
        title: 'Info',
        message: "You've reached the end of search results.",
        color: 'blue',
      });
    }
  } catch (error) {
    buttonMore.hidden = true;

    showToast({ title: 'Error!', message: error.message });
  } finally {
    loader.hidden = true;
  }
}

async function searchMore() {
  buttonMore.hidden = true;

  loader.hidden = false;

  try {
    const data = await getImagesByQuery(searchWord, page);

    if (data.total === 0) {
      showToast({ message: 'No more images found.' });

      return;
    }

    photoGallery.insertAdjacentHTML('beforeend', createGallery(data.data));
    book.refresh();
    page += 1;

    const { height: cardHeight } =
      photoGallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (photoGallery.children.length >= data.data.totalHits) {
      buttonMore.hidden = true;
      showToast({
        title: 'Info',
        message: "You've reached the end of search results.",
        color: 'blue',
      });
    } else {
      buttonMore.hidden = false;
    }
  } catch (error) {
    buttonMore.hidden = true;

    showToast({ title: 'Error!', message: error.message });
  } finally {
    loader.hidden = true;
  }
}

