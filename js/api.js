import {renderMiniatures} from './ miniature.js';
import {showAlert, debounce} from './util.js';
import {openResultElement} from './user-form.js';
import { onRandomSortButtonClick, onDefaultSortButtonClick, onDiscussedSortButtonClick } from './ miniature.js';
const RERENDER_DELAY = 500;

const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';

const getPicturesFromServer = () => {
  fetch (`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then ((picturesFromServer) => {
      renderMiniatures(picturesFromServer);
      const debouncedRanderMiniature = debounce(renderMiniatures, RERENDER_DELAY);
      onRandomSortButtonClick(picturesFromServer, debouncedRanderMiniature);
      onDefaultSortButtonClick(picturesFromServer, debouncedRanderMiniature);
      onDiscussedSortButtonClick(picturesFromServer, debouncedRanderMiniature);
    })
    .catch (()=> {
      showAlert ('Не получилось загрузить данные! Обновите страницу!');
    });
};


const sendUserFormDatatoServer = (body, onSuccess, successTemplate, errorTemplate) => {
  fetch(
    BASE_URL,
    {
      method: 'POST' ,
      body
    }
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
        openResultElement(successTemplate);
      } else {
        throw new Error();
      }
    }
    )
    .catch(()=> {
      openResultElement(errorTemplate);
    });

};

export {getPicturesFromServer, sendUserFormDatatoServer};
