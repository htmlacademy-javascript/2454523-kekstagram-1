import { getRandomArrayElement, } from './util.js';
import {getBigPicture} from './full-image.js';
const COUNT_RANDOM_MINIATURES = 10;
const miniaturesContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');
const sortRandomButton = document.querySelector('#filter-random');
const sortDefaultButton = document.querySelector('#filter-default');
const sortDiscussedButton = document.querySelector('#filter-discussed');


const createMiniature = (picture) => {
  const pictureElement = miniatureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.dataset.id = picture.id;

  return pictureElement;
};


const renderMiniatures = (picturesFromServer) => {

  const fragment = document.createDocumentFragment();
  picturesFromServer.forEach((picture) => {
    const miniatureElement = createMiniature(picture);
    fragment.append(miniatureElement);
  });

  miniaturesContainer.append(fragment);
  getBigPicture(picturesFromServer);
  imgFilters.classList.remove('img-filters--inactive');
};


const clearMiniatureContainer = () => {
  const allMiniatures = miniaturesContainer.querySelectorAll('a');
  allMiniatures.forEach((miniature) => {
    miniature.remove();
  });
};

const getUniqueRandomMiniatureArray = (picturesFromServer) => {
  const uniqueRandomMiniatureArray = [];
  while (uniqueRandomMiniatureArray.length < COUNT_RANDOM_MINIATURES) {
    const uniqueElement = getRandomArrayElement(picturesFromServer);
    if (!uniqueRandomMiniatureArray.includes(uniqueElement)) {
      uniqueRandomMiniatureArray.push(uniqueElement);
    }
  }
  return uniqueRandomMiniatureArray;
};

const onHeaderButtonClick = (evt) => {
  const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  imgFiltersButtons.forEach((button)=>{
    button.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
};

const onRandomSortButtonClick = (picturesFromServer, callback) => {
  sortRandomButton.addEventListener('click', (evt) => {
    clearMiniatureContainer();
    const randomMiniatureArray = getUniqueRandomMiniatureArray(picturesFromServer);
    callback(randomMiniatureArray);
    onHeaderButtonClick(evt);
  }
  );
};

const onDefaultSortButtonClick = (picturesFromServer,callback) => {
  sortDefaultButton.addEventListener('click', (evt)=> {
    clearMiniatureContainer();
    callback(picturesFromServer);
    onHeaderButtonClick(evt);
  });
};

const onDiscussedSortButtonClick = (picturesFromServer, callback) => {
  sortDiscussedButton.addEventListener('click', (evt) => {
    clearMiniatureContainer();

    const compareMiniature = (miniatureA, miniatureB) => {
      const countOfLikesA = miniatureA.comments.length;
      const countOfLikesB = miniatureB.comments.length;

      return countOfLikesB - countOfLikesA;
    };

    const sortArray = picturesFromServer.slice().sort(compareMiniature);

    callback(sortArray);
    onHeaderButtonClick(evt);
  });
};

export {renderMiniatures, onRandomSortButtonClick, onDefaultSortButtonClick, onDiscussedSortButtonClick };
