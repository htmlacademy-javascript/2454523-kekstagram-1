import { isEscapeKey } from './util.js';

const COMMENTS_PER_PAGE = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCommentElement = document.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');


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

const getSubCommentsArray = (comments, firstIndex,lastIndex) => comments.slice(firstIndex,lastIndex);

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

  const firstCommentIndex = 0;
  let lastCommentsIndex = COMMENTS_PER_PAGE;

  const currentCommentsArray = getSubCommentsArray(comments,firstCommentIndex,lastCommentsIndex);
  appendCommentsBlock(currentCommentsArray);
  let commentsCountForShow = currentCommentsArray.length;
  bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${commentsCountForShow } из `;
  commentsLoaderButton.classList.remove('hidden');
  if (comments.length <= COMMENTS_PER_PAGE) {
    commentsLoaderButton.classList.add('hidden');
  }


  commentsLoaderButton.addEventListener('click', ()=> {
    if (comments.length > COMMENTS_PER_PAGE) {
      commentsContainerElement.innerHTML = '';
      lastCommentsIndex += COMMENTS_PER_PAGE;
      const nextCommentsArray = getSubCommentsArray(comments,firstCommentIndex,lastCommentsIndex);
      appendCommentsBlock(nextCommentsArray);
      commentsCountForShow = nextCommentsArray.length;
      bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${commentsCountForShow } из `;
      commentsLoaderButton.classList.remove('hidden');

      if (nextCommentsArray.length === comments.length) {
        commentsLoaderButton.classList.add('hidden');
      }
    }
  });
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
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

const getBigPicture = (pictures) => {
  const allMiniatures = document.querySelectorAll('.picture');
  allMiniatures.forEach((miniature)=> {
    miniature.addEventListener('click', () => {

      createBigPicture(pictures,miniature);
      openBigPicture();
    });

  });
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');

};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export {getBigPicture};

