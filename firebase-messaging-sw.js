importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDey-KaC_Ty-dqijuQMWeQjtUx3eaaXc6k",
    authDomain: "mera-jehlum.firebaseapp.com",
    projectId: "mera-jehlum",
    messagingSenderId: "1093409222171",
    appId: "1:1093409222171:web:e9c1d2113c6bb7ae2952be"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Background message received ', payload);
    
    const title = payload.notification.title;
    let soundFile = 'azaan.mp3'; // Default sab ke liye

    // Logic for specific sounds
    if (title.includes("سحری")) {
        soundFile = 'sehri.mp3';
    } else if (title.includes("افطاری")) {
        soundFile = 'aftari.mp3';
    }

    const notificationOptions = {
        body: payload.notification.body,
        icon: 'icon.png',
        badge: 'icon.png',
        tag: 'namaz-alert',
        renotify: true,
        // Browser/Android settings agar allow karein to ye sound trigger hogi
        sound: soundFile, 
        vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170],
        data: {
            url: '/home.html?autoPlay=true' // Click karne par full azaan ke liye hint
        }
    };

    return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(windowClients => {
            // Agar app pehle se khuli hai to focus karein, warna naye tab mein kholien
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/home.html?playNow=true');
            }
        })
    );
});
