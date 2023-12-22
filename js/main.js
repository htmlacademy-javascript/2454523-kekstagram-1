const PHOTO_COUNT = 25;
const URL_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MАХ_COUNT = 200;
const COMMENT_COUNT = 3;

const DESCRIPTIONS = ['рыжий кот', 'серый кот', ',белый кот', 'много котов'];

const COMMENTATORS_NAMES = [
  'Иван',
  'Мария',
  'Артем',
  'Виктор',
  'Юлия',
  'Александр',
  'Петр',
];

const textOfCommentaries = {
  text1: 'Всё отлично!',
  text2:'В целом всё неплохо. Но не всё.',
  text3: 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  text4: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  text5: 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  text6: 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createUniqueInteger (a, b) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const uniqueIntegerForId = createUniqueInteger(1, PHOTO_COUNT);
const uniqueIntegerForUrl = createUniqueInteger(1,URL_COUNT);
const uniqueIntegerForCommentsId = createUniqueInteger(1, 10000);

const getUrl = () => `photos/${ uniqueIntegerForUrl() }.jpg`;

const getAvatar = () => `img/avatar-${ getRandomInteger(1, AVATAR_COUNT) }.svg`;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComments = () => ({
  id: uniqueIntegerForCommentsId(),
  avatar: getAvatar(),
  message: getRandomArrayElement(Object.values(textOfCommentaries)),
  name: getRandomArrayElement(COMMENTATORS_NAMES),
});

const createPhoto = () => ({
  id: uniqueIntegerForId(),
  url: getUrl(),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MАХ_COUNT),
  comments:  Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createComments),
  description: getRandomArrayElement(DESCRIPTIONS),

});

const photos = Array.from({length: PHOTO_COUNT}, createPhoto);
console.log(photos);

