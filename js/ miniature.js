const miniaturesContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

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
};
export {renderMiniatures};
