export function makeGallery(getedObject) {
  const neccesaryArray = getedObject.hits;
  return neccesaryArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="card">
            <div class="place-for-image">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" class="picture"/>
                </a>
            </div>
            <div class="info-text">
                <div class="description">
                    <span class="bold-text">Likes</span>
                    <span class="info-value">${likes}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Views</span>
                    <span class="info-value">${views}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Comments</span>
                    <span class="info-value">${comments}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Downloads</span>
                    <span class="info-value">${downloads}</span>
                </div>
            </div>
        </li>`
    )
    .join('');
}

const loader = document.querySelector('.loader-text');

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}


///////////////////

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

// export function showLoader() {
//   loader.classList.add('visible');
// }

// export function hideLoader() {
//   loader.classList.remove('visible');
// }

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}
