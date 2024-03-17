import './scale.js';
import './effect-slider.js';
import {getData} from './api.js';
import {setUserFormSubmit, closeUserForm} from './user-form.js';

getData();
setUserFormSubmit(closeUserForm);
