const STEP_FOR_SCALE_CONTROL = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const imgUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');


const setScale = (scaleValue) => {
  scaleControlValue.setAttribute('value',scaleValue);
  scaleControlValue.value = `${scaleValue }%`;
  imgUploadPreview.style.transform = `scale(${ scaleValue / 100 })`;
};

const setDefaultScale = () => {
  setScale(DEFAULT_SCALE);
};

scaleControlSmaller.addEventListener('click', ()=> {
  let newScaleValue = parseInt(scaleControlValue.value, 10);
  newScaleValue -= STEP_FOR_SCALE_CONTROL;
  if (newScaleValue < MIN_SCALE) {
    newScaleValue = MIN_SCALE;
  }
  setScale(newScaleValue);
});

scaleControlBigger.addEventListener('click', ()=> {
  let newScaleValue = parseInt(scaleControlValue.value, 10);
  newScaleValue += STEP_FOR_SCALE_CONTROL;
  if (newScaleValue > MAX_SCALE) {
    newScaleValue = MAX_SCALE;
  }
  setScale(newScaleValue);
});

export {setDefaultScale};
