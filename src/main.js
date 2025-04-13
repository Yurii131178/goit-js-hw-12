import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, showLoader, hideLoader } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const photoGallery = document.querySelector('.gallery');
const buttonMore = document.querySelector('.buttonMore');

const lightbox = new SimpleLightbox('.gallery a', {
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
  showLoader();

  searchWord = event.currentTarget.elements.inputSearch.value.trim();

  if (!searchWord) {
    iziToast.show({
        message: 'Please enter a search query.',
        messageSize: 25,
        backgroundColor: 'orange',
      messageColor: 'red',
      color: 'orangered',
      position: 'topCenter',
      timeout: 2000,
    });
    hideLoader();
    return;
  }

  page = 1;

  try {
    const data = await getImagesByQuery(searchWord, page);

    if (data.totalHits === 0) {
      iziToast.show({
        message: 'No images found. Try another query.',
        messageSize: 25,
        backgroundColor: 'orange',
      messageColor: 'red',
      color: 'orangered',
      position: 'topCenter',
      timeout: 2000,
      });
      hideLoader();
      return;
    }

    photoGallery.insertAdjacentHTML('beforeend', createGallery(data));
    lightbox.refresh();
    event.target.reset();
    buttonMore.hidden = false;
    page ++;

    if (photoGallery.children.length >= data.totalHits) {
      buttonMore.hidden = true;
    }
  } catch (error) {
      console.log(error)
       
  } finally {
    hideLoader();
  }
}

async function searchMore() {
  buttonMore.hidden = true;
  showLoader();

  try {
    const data = await getImagesByQuery(searchWord, page);

    if (data.totalHits === 0) {
      iziToast.show({
        message: 'No more images found.',
        messageColor: 'red',
        color: 'tomato',
        position: 'center',
        timeout: 2000,
      });
      return;
    }

    photoGallery.insertAdjacentHTML('beforeend', createGallery(data));
    lightbox.refresh();
    page++;

    const { height: cardHeight } = photoGallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (photoGallery.children.length >= data.totalHits) {
      buttonMore.hidden = true;
      iziToast.show({
        
        message: "You've reached the end of search results.",
        messageSize: 25,
        backgroundColor: 'orange',
      messageColor: 'red',
      color: 'orangered',
      position: 'center',
      timeout: 2000,
      
      });
    } else {
      buttonMore.hidden = false;
    }
  } catch (error) {
    buttonMore.hidden = true;
    iziToast.show({
      title: 'Error!',
      message: error.message,
      color: 'red',
      position: 'center',
      timeout: 2000,
    });
  } finally {
    hideLoader();
  }
}