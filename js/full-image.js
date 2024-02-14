import { isEscapeKey } from './util.js';
import { pictures } from './ miniature.js';

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
    document.body.classList.remove('modal-open');
  }
};

const createCommentElement = (comment)=>{
  const commentElement = socialCommentElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const getSubCommentsArray = (firsIndex,lastIndex, comments) => comments.slice(firsIndex,lastIndex);

const appendCommentsBlock = (comments) => {
  const commentsContainerFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsContainerFragment.append(commentElement);
  });
  commentsContainerElement.append(commentsContainerFragment);
};

const renderComments = (comments) => {
  commentsContainerElement.innerHTML = '';

  let firsCommentIndex = 0;
  let lastCommentsIndex = 5;

  const currentCommentsArray = getSubCommentsArray(firsCommentIndex,lastCommentsIndex,comments);
  appendCommentsBlock(currentCommentsArray);
  let commentsCountForShow = currentCommentsArray.length;
  bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${commentsCountForShow } из `;

  bigPicture.querySelector('.comments-loader').addEventListener('click', ()=> {
    firsCommentIndex += 5;
    lastCommentsIndex += 5;
    if (lastCommentsIndex <= comments.length) {
      const nextCommentsArray = getSubCommentsArray(firsCommentIndex,lastCommentsIndex,comments);
      appendCommentsBlock(nextCommentsArray);
      commentsCountForShow += 5;
      bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${commentsCountForShow } из `;
    } else {
      lastCommentsIndex = comments.length + 1;
      const nextCommentsArray = getSubCommentsArray(firsCommentIndex,lastCommentsIndex,comments);
      appendCommentsBlock(nextCommentsArray);
      commentsCountForShow = comments.length;
      bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${commentsCountForShow } из `;
    }
  });

};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
} ;

const createBigPicture = (picturesArray, miniature) => {

  const picture = picturesArray.find((pic) => pic.id === +miniature.dataset.id);

  bigPictureImg.src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  renderComments(picture.comments);
};

allMiniatures.forEach((miniature)=> {
  miniature.addEventListener('click', () => {

    createBigPicture(pictures,miniature);
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
