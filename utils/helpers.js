import { AsyncStorage } from 'react-native';
export const MY_DECKS_KEY = 'myflashdecks';

export function getDecks() {
  return AsyncStorage.getItem(MY_DECKS_KEY)
    .then((decks) => {
      if(typeof decks == 'undefined' || decks === null || decks.length < 5) {
        return {
          React: {
            title: 'React',
            questions: [
              {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
              },
              {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
              }
            ]
          },
          JavaScript: {
            title: 'JavaScript',
            questions: [
              {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
              }
            ]
          }
        };
      } else { 
        return JSON.parse(decks);
      }
    });
}

export function getDeck(key) {
  return AsyncStorage.getItem(MY_DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      return data[key];
    });
}

export function addDeckByTitle(deckName) {
  const key = deckName.replace(/\s/g, '');
  return AsyncStorage.mergeItem(MY_DECKS_KEY, JSON.stringify({
    [key]: { title: deckName, questions: [] },
  }));
};

export function saveDeck({ deck, key }) {
  return AsyncStorage.mergeItem(MY_DECKS_KEY, JSON.stringify({
    [key]: deck,
  }));
};

export function deleteDeck(key)  {
  return AsyncStorage.getItem(MY_DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(MY_DECKS_KEY, JSON.stringify(data));
    });
}

export function addCardToDeck(key, question) {
  return AsyncStorage.getItem(MY_DECKS_KEY)
  .then((results) => {
    const data = JSON.parse(results);
    data[key].questions.push(question);
    AsyncStorage.setItem(MY_DECKS_KEY, JSON.stringify(data));
  })
}
