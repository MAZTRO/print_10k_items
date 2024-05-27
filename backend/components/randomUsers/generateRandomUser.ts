import { abilities, names, lastNames, imageID } from "./dataList"
import { RandomUser } from "../../utilities/interface"

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(getRandomInt(0, characters.length - 1));
  }
  return result;
}

const getRandomSentence = (minWords: number, maxWords: number) => {
  const wordCount = getRandomInt(minWords, maxWords);
  let sentence = "";
  for (let i = 0; i < wordCount; i++) {
    sentence += getRandomString(getRandomInt(1, 10)) + " "
  }
  return sentence.trim();
}

const getRandomAbility = () => {
  const randomIndex = Math.floor(Math.random() * abilities.length);
  return abilities[randomIndex];
}

const getRandomName = () => {
  const randomIndexNames = Math.floor(Math.random() * names.length);
  const randomIndexLastNames = Math.floor(Math.random() * lastNames.length);
  return `${names[randomIndexNames]} ${lastNames[randomIndexLastNames]}`;
}

const getRandomIamgeId = () => {
  const randomIndex = Math.floor(Math.random() * imageID.length);
  return imageID[randomIndex]
}

const generateRandomUser = (n: number): RandomUser => {
  return {
    id: n,
    name: getRandomName(),
    age: getRandomInt(10, 79),
    description: getRandomSentence(5, 20),
    image: `https://picsum.photos/id/${getRandomIamgeId()}/200/200`,
    abilities: [...new Set(Array.from({ length: Math.floor(Math.random() * 4) + 2 }, getRandomAbility))],
  }
}

export const generateRandomUsers = (count: number): RandomUser[] => {
  if (count < 1) {
    throw new Error('Invalid count')
  }
  let tempArr = []
  for (let index = 0; index < count; index++) {
    tempArr.push(generateRandomUser(index + 1))
  }

  return tempArr
}