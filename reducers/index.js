import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      const key = action.deckName.replace(/\s/g, '');
      return {
        ...state,
        [key]: { 
          title: action.deckName,
          questions: [],
        }
      }
    default:
      return state
  }
}

export default decks 