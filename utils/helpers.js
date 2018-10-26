import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const MY_DECKS_KEY = 'myflashdecks';
const NOTIFICATION_KEY = 'myflashcards:notifications';

export function getDecks() {
  return AsyncStorage.getItem(MY_DECKS_KEY)
    .then((decks) => {
      if (typeof decks == 'undefined' || decks === null || decks.length < 5) {
        decks = {
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
        AsyncStorage.setItem(MY_DECKS_KEY, JSON.stringify(decks));
        return decks;
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

export function deleteDeck(key) {
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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Quick Study Reminder!',
    body: "Why not use your lunch break to go through one of your flashcard stacks? Frequent study helps you retain information better",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null || typeof data === 'undefined') {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              // tomorrow.setDate(tomorrow.getDate()) //Used for testing Notification functionality
              tomorrow.setHours(10)
              tomorrow.setMinutes(15)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          });
      }
    });
}
