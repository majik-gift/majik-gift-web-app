// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn6WjDJCOad2uCDgBj6cSgUvjDgv89j94",
  authDomain: "majik-gift-d11c3.firebaseapp.com",
  projectId: "majik-gift-d11c3",
  storageBucket: "majik-gift-d11c3.firebasestorage.app",
  messagingSenderId: "145417668022",
  appId: "1:145417668022:web:55e450011079e9521e2d17",
  measurementId: "G-TCDCFE6J1T"
};

firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);

// class CustomPushEvent extends Event {
//   constructor(data) {
//     super('push');

//     Object.assign(this, data);
//     this.custom = true;
//   }
// }

// /*
//  * Overrides push notification data, to avoid having 'notification' key and firebase blocking
//  * the message handler from being called
//  */
// self.addEventListener('push', (e) => {
//   // Skip if event is our own custom event
//   if (e.custom) return;

//   // Kep old event data to override
//   const oldData = e.data;

//   // Create a new event to dispatch, pull values from notification key and put it in data key,
//   // and then remove notification key
//   const newEvent = new CustomPushEvent({
//     data: {
//       ehheh: oldData.json(),
//       json() {
//         const newData = oldData.json();
//         newData.data = {
//           ...newData.data,
//           ...newData.notification,
//         };
//         delete newData.notification;
//         return newData;
//       },
//     },
//     waitUntil: e.waitUntil.bind(e),
//   });

//   // Stop event propagation
//   e.stopImmediatePropagation();

//   // Dispatch the new wrapped event
//   dispatchEvent(newEvent);
// });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  const { title, body, icon, badge, image, notificationType, ...restPayload } = payload.data;

  


  const notificationOptions = {
    body,
    icon: icon || '/favicon.ico',
    badge: badge || '/favicon.ico',
    image: image,
    data: {
      ...restPayload,
      notificationType,
    },
    actions: [
      {
        action: 'open',
        title: 'Open',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ],
  };

  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  if (event?.notification?.data?.notificationType === 'new-message') {
    const chatId = event.notification.data.chatId;
    const basePath = new URL(`/chat`, event.currentTarget.origin).href;
    const pathToOpen = new URL(`/chat?chatId=${chatId}`, event.currentTarget.origin).href;

    event.waitUntil(
      clients
        .matchAll({
          type: 'window',
          includeUncontrolled: true,
        })
        .then((clientList) => {
          const matchingClient = clientList.find((client) => {
            const clientUrl = new URL(client.url);
            const urlWithoutQuery = clientUrl.origin + clientUrl.pathname;
            return urlWithoutQuery === basePath;
          });

          if (matchingClient) {
            matchingClient.postMessage({ type: 'NEW_NOTIFICATION', chatId });
            return matchingClient.focus();
          } else {
            return clients.openWindow(pathToOpen);
          }
        })
    );
  } else {
    event.waitUntil(
      clients.openWindow(new URL(`/notifications`, event.currentTarget.origin).href)
    );
  }
});
