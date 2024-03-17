import {renderMiniatures} from './ miniature.js';
import {getBigPicture} from './full-image.js';
import {showAlert} from './util.js';
import {openResultElement} from './user-form.js';

const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';

const getData = () => {
  fetch (`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then ((picturesFromServer) => {
      renderMiniatures(picturesFromServer);
      getBigPicture(picturesFromServer);
    })
    .catch (()=> {
      showAlert ('Не получилось загрузить данные! Обновите страницу!');
    });
};


const sendData = (body, onSuccess, successTemplate, errorTemplate) => {
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

export {getData, sendData};
