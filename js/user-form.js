import { isEscapeKey } from './util.js';
import {setDefaultScale} from './scale.js';
import {setDefaultEffect} from './effect-slider.js';
import {sendUserFormDatatoServer} from './api.js';
const MAX_HASHTAG_COUNT = 5;
const COMMENTS_LENGTH = 140;
const imgUploadForm = document.querySelector('.img-upload__form');
const fileUploadControl = imgUploadForm.querySelector('#upload-file');
const uploadCancelButton = imgUploadForm.querySelector('#upload-cancel');
const inputHashTag = imgUploadForm.querySelector('.text__hashtags');
const inputTextDescription = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');


const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if(document.activeElement !== inputHashTag && document.activeElement !== inputTextDescription){
      evt.preventDefault();
      imgUploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
      document.body.classList.remove('modal-open');
      fileUploadControl.value = '';
      inputHashTag.value = '';
      inputTextDescription.value = '';
    }
  }
};

fileUploadControl.addEventListener('change', ()=>{
  imgUploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  setDefaultScale();
  setDefaultEffect();
  submitButton.disabled = false;
});


const closeUserForm = () => {
  imgUploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fileUploadControl.value = '';
  inputHashTag.value = '';
  inputTextDescription.value = '';
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

const isHashTagValid = (hashTag) => {
  const hashTagRegEx = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashTagRegEx.test(hashTag);
};

const validateHashTag = (value) => {
  if (value === '') {
    submitButton.disabled = false;
    return true;
  }
  const arrayOfHashtag = value.split(' ').filter((tag) => tag !== '');
  const newArrayForHashTag = [];
  for (let i = 0; i < arrayOfHashtag.length; i++) {
    if (!isHashTagValid(arrayOfHashtag[i])) {
      submitButton.disabled = true;
      return false;
    }
    if(newArrayForHashTag.includes(arrayOfHashtag[i])){
      submitButton.disabled = true;

      return false;
    } else {
      newArrayForHashTag.push(arrayOfHashtag[i]);
    }
    if (arrayOfHashtag.length > MAX_HASHTAG_COUNT) {
      submitButton.disabled = true;

      return false;
    }
  }
  submitButton.disabled = false;

  return true;

};


pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateHashTag,
  'Ошибка заполнения ХэшТега'
);


const validateCommentsField = (value) => {
  if(value.length <= COMMENTS_LENGTH) {
    submitButton.disabled = false;
    return true;
  } else {
    submitButton.disabled = true;
  }
};

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  validateCommentsField,
  `Не более ${ COMMENTS_LENGTH } символов`
);

const openResultElement = (template) => {
  const resultElement = template.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', resultElement);
  const onDocumentKeydownEscForResultElement = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      resultElement.remove();
    }
  };
  document.addEventListener('keydown', onDocumentKeydownEscForResultElement);

  const onDocumentClickOutsideResultElement = (evt) =>{
    if (!resultElement.querySelector('div').contains(evt.target)) {
      resultElement.remove();
    }
  };
  document.addEventListener('click',onDocumentClickOutsideResultElement);

  const closeButton = resultElement.querySelector('button');
  closeButton.addEventListener('click', ()=>{
    resultElement.remove();
  });
};

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    submitButton.disabled = true;
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      sendUserFormDatatoServer(formData,onSuccess,successTemplate,errorTemplate);
    }
  });
};

export {setUserFormSubmit, closeUserForm, openResultElement};

