import {getPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictures = getPhotos();

const picturesContainerFragment = document.createDocumentFragment();

pictures.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  picturesContainerFragment.append(pictureElement);
});

picturesContainer.append(picturesContainerFragment);
