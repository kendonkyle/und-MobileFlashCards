import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION, REMOVE_DECK } from '../actions'

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
    case ADD_QUESTION:
      debugger
      return {
        ...state,
        [action.key]: { 
          ...state[action.key],
          questions: state[action.key].questions.concat([action.question]),
        }
      }
    case REMOVE_DECK:
      const removekey = action.deckName.replace(/\s/g, '');
      const { [removekey]: value , ...newState } = state;
      return newState;
    default:
      return state
  }
}

export default decks 