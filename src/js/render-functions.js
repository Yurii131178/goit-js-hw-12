
export function createGallery(data) {
  const newArray = data.hits;
  return newArray
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

export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
  document.querySelector('.loader').classList.add('show');
}

export function hideLoader() {
  document.querySelector('.loader').classList.remove('show');
  document.querySelector('.loader').classList.add('hidden');
}
