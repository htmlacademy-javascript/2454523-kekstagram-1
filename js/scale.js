const STEP_FOR_SCALE_CONTROL = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const imgUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');


const setDefaultScale = () => {
  scaleControlValue.value = `${DEFAULT_SCALE }%`;
  imgUploadPreview.style.transform = `scale(${ DEFAULT_SCALE / 100 })`;
};

scaleControlSmaller.addEventListener('click', ()=> {
  let newScaleValue = parseInt(scaleControlValue.value, 10);
  newScaleValue -= STEP_FOR_SCALE_CONTROL;
  if (newScaleValue < MIN_SCALE) {
    newScaleValue = MIN_SCALE;
  } else if (newScaleValue > MAX_SCALE) {
    newScaleValue = MAX_SCALE;
  }
  scaleControlValue.value = `${newScaleValue }%`;
  imgUploadPreview.style.transform = `scale(${ newScaleValue / 100 })`;
});

scaleControlBigger.addEventListener('click', ()=> {
  let newScaleValue = parseInt(scaleControlValue.value, 10);
  newScaleValue += STEP_FOR_SCALE_CONTROL;
  if (newScaleValue < 0) {
    newScaleValue = 0;
  } else if (newScaleValue > 100) {
    newScaleValue = 100;
  }
  scaleControlValue.value = `${newScaleValue }%`;
  imgUploadPreview.style.transform = `scale(${ newScaleValue / 100 })`;
});

export {setDefaultScale};
