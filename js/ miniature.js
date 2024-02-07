import {getPhotos} from './data.js';

const miniaturesContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createMiniature = (picture) => {
  const pictureElement = miniatureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.dataset.pictureDescription = picture.description;
  pictureElement.pictureComments = picture.comments;

  return pictureElement;
};

const renderMiniatures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const miniatureElement = createMiniature(picture);
    fragment.append(miniatureElement);
  });

  miniaturesContainer.append(fragment);
};

renderMiniatures(getPhotos());
