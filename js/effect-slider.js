const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');
const effectSlider = imgUploadForm.querySelector('.effect-level__slider');
const containerForSlider = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsRadios = imgUploadForm.querySelectorAll('.effects__radio');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');

const setDefaultEffect = () => {
  imgUploadPreview.className = 'effects__preview--none';
  imgUploadPreview.removeAttribute('style');
  containerForSlider.classList.add('hidden');
  effectSlider.classList.add('hidden');
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

const updateFilter = () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  const effectValue = parseFloat(effectLevelValue.value);
  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = `grayscale(${ effectValue })`;
  } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = `sepia(${ effectValue })` ;
  } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = `invert(${ effectValue }%)` ;
  } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = `blur(${ effectValue }px)`;
  } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = `brightness(${ effectValue })`;
  } else if (imgUploadPreview.classList.contains('effects__preview--none')) {
    imgUploadPreview.removeAttribute('style');
  }
};

effectSlider.noUiSlider.on('update', updateFilter);

const updateEffectSlider = () => {
  const options = {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  };

  if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    options.range.max = 100;
    options.start = 100;
    options.step = 1;
  } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    options.range.max = 3;
    options.start = 3;
  } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    options.range.min = 1;
    options.range.max = 3;
    options.start = 3;
  }

  effectSlider.noUiSlider.updateOptions(options);
};

for (const effectRadio of effectsRadios) {
  effectRadio.addEventListener('change', (evt) => {
    if(evt.target.checked) {
      const classOfEffect = `effects__preview--${ evt.target.value}`;
      imgUploadPreview.className = classOfEffect;
      if (evt.target.value === 'none') {
        imgUploadPreview.removeAttribute('style');
        containerForSlider.classList.add('hidden');
        effectSlider.classList.add('hidden');

      } else {
        containerForSlider.classList.remove('hidden');
        effectSlider.classList.remove('hidden');
      }
    }
    updateEffectSlider();
  }
  );

}

export {setDefaultEffect};
