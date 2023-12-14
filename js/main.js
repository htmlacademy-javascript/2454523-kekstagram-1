/*const object = {
  id: getRandomId(1, 25),
  url:
  description: 'description' + object.id
  likes:
 comments:

}; */

/*const objectInComments = {
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}; */

// id, число — идентификатор опубликованной фотографии
// Это число от 1 до 25.
// Идентификаторы не должны повторяться.

const getRandomId = (minId, maxId) => {
  const lower = Math.ceil(Math.min(minId, maxId));
  const upper = Math.floor(Math.max(minId, maxId));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

console.log(getRandomId(1, 25));



// url, строка — адрес картинки вида photos/{{i}}.jpg,
// где {{i}} — это число от 1 до 25
// Адреса картинок не должны повторяться

const getRandomUrl = (minUrl, maxUrl) => {
  const lower = Math.ceil(Math.min(minUrl, maxUrl));
  const upper = Math.floor(Math.max(minUrl, maxUrl));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

console.log(getRandomUrl(1, 25));


// Функция для возврата адреса картинки с учетом рандомного url

const getUrl = (minUrl, maxUrl) => {
return 'photos/' + getRandomUrl(minUrl, maxUrl) + '.jpg';
};

console.log(getUrl(1, 25));

// description, строка — описание фотографии. Описание придумайте самостоятельно.
// описанием будет конкатенация между словом description и номером id картинки
// Функция для описания фотографии (ДОДЕЛАТЬ!)

const getDescription = (id) => {
return 'description: ' + id

};

console.log(getDescription());

// likes, число — количество лайков, поставленных фотографии.
//Случайное число от 15 до 200.

const getRandomLikes = (minLikes, maxLikes) => {
  const lower = Math.ceil(Math.min(minLikes, maxLikes));
  const upper = Math.floor(Math.max(minLikes, maxLikes));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

console.log(getRandomLikes(15, 200));

//comments, массив объектов — список комментариев, оставленных другими пользователями
// к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё
//усмотрение. Все комментарии генерируются случайным образом.
//Пример описания объекта с комментарием:
/*const objectInComments = {
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}; */

