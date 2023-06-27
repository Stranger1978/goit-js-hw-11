import './css/index.css';
import Notiflix from 'notiflix';
import ImageApiService from "./api-search-image";

const refs = {
searchForm: document.querySelector('.search-form'),
photoGallery: document.querySelector('.gallery'),
loadMoreBtn: document.querySelector('.load-more'),
}

refs.loadMoreBtn.classList.add("is-hidden");
const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
    evt.preventDefault();
    clearImageGallery();
    refs.loadMoreBtn.classList.add("is-hidden");
    imageApiService.query = evt.currentTarget.elements.searchQuery.value;
    if (imageApiService.query === '') {
        return Notiflix.Notify.warning('Please enter valid data!');
    }
    imageApiService.resetPage(); 
    imageApiService.fetchArticles().then(hits => { 
        Notiflix.Notify.success(`Hooray! We found ${imageApiService.total_hits} images.`);
        createImageGallery(hits);
        if (imageApiService.per_page<imageApiService.total_hits) {
       refs.loadMoreBtn.classList.remove("is-hidden");     
        }
    });
    
};

function onLoadMore() { 
    if (Math.ceil(imageApiService.total_hits/imageApiService.per_page)===imageApiService.page) {
        refs.loadMoreBtn.classList.add("is-hidden");
        Notiflix.Notify.info(`We are sorry, but you've reached the end of search results.`);  
    }
    imageApiService.fetchArticles().then(createImageGallery);
}

function clearImageGallery() { 
    
    refs.photoGallery.innerHTML = '';
}

function createImageGallery(hits) {
    const createCard = hits.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads} 
      </p>
    </div>
    </div>`;
      }
    )
    .join(''); 
    refs.photoGallery.insertAdjacentHTML('beforeend', createCard);
}