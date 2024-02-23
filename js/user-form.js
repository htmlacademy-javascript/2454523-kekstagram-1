import { isEscapeKey } from './util.js';
const imgUploadForm = document.querySelector('.img-upload__form');
const fileUploadControl = imgUploadForm.querySelector('#upload-file');
const uploadCancelButton = imgUploadForm.querySelector('#upload-cancel');
const inputHashTag = imgUploadForm.querySelector('.text__hashtags');
const inputTextDescription = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const MAX_HASHTAG_COUNT = 5;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if(document.activeElement !== inputHashTag && document.activeElement !== inputTextDescription){
      evt.preventDefault();
      imgUploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
      document.body.classList.remove('modal-open');
      fileUploadControl.value = '';
      inputHashTag.value = '';
      inputTextDescription.textContent = '';
    }
  }
};


fileUploadControl.addEventListener('change', ()=>{
  imgUploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
});


const closeUserForm = () => {
  imgUploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fileUploadControl.value = '';
  inputHashTag.value = '';
  inputTextDescription.textContent = '';
};

uploadCancelButton.addEventListener('click', ()=> {
  closeUserForm();
});

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const validateHashTag = (value) => {
  const arrayOfHashtag = value.split('#');
  arrayOfHashtag.shift();
  const hashTagRegEx = /^#[a-zа-яё0-9]{1,19}$/i;
  if (arrayOfHashtag.length >= 0 && arrayOfHashtag.length <= MAX_HASHTAG_COUNT) {
    const newArrayForHashTag = [];
    for (let i = 0; i < arrayOfHashtag.length; i++) {
      const hashTagNew = `#${ arrayOfHashtag[i].trimEnd()}`;
      if (!hashTagRegEx.test(hashTagNew)) {
        return false;
      }
      if (newArrayForHashTag.includes(hashTagNew)) {
        return false;
      } else {
        newArrayForHashTag.push(hashTagNew);
      }
    }
    return true;
  }
  if (arrayOfHashtag.length > MAX_HASHTAG_COUNT) {
    return false;
  }
};

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateHashTag,
  'Ошибка заполнения ХэшТега'
);


const validateCommentsField = (value) => value.length <= 140;

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  validateCommentsField,
  'Не более 140 символов'
);

imgUploadForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
    submitButton.disabled = true;
  }
});
