export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(deckName) {
  return {
    type: ADD_DECK,
    deckName,
  };
}

export function removeDeck(deckName) {
  return {
    type: REMOVE_DECK,
    deckName,
  };
}

export function addQuestion(key, question)  {
  return {
    type: ADD_QUESTION,
    key,
    question
  };
}