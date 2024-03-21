import './scale.js';
import './effect-slider.js';
import {getPicturesFromServer} from './api.js';
import {setUserFormSubmit, closeUserForm} from './user-form.js';

getPicturesFromServer();
setUserFormSubmit(closeUserForm);
