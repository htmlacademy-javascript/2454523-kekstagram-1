import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const allMiniatures = document.querySelectorAll('.picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCommentElement = document.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const createCommentElement = (comment)=>{
  const commentElement = socialCommentElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const renderComments = (comments) => {
  commentsContainerElement.innerHTML = '';
  const commentsContainerFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsContainerFragment.append(commentElement);
  });
  commentsContainerElement.append(commentsContainerFragment);

};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
} ;

const createBigPicture = (miniature) => {
  bigPictureImg.src = miniature.querySelector('.picture__img').src;
  bigPicture.querySelector('.likes-count').textContent = miniature.querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.comments-count').textContent = miniature.querySelector('.picture__comments').textContent;
  bigPicture.querySelector('.social__caption').textContent = miniature.dataset.pictureDescription;
  renderComments(miniature.pictureComments);

};


allMiniatures.forEach((miniature)=> {
  miniature.addEventListener('click', (evt) => {
    createBigPicture(miniature);
    openBigPicture();
  });

});

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');

};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

