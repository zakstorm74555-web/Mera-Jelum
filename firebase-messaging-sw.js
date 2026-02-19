importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase Config (Wahi purani wali)
const firebaseConfig = {
    apiKey: "AIzaSyDey-KaC_Ty-dqijuQMWeQjtUx3eaaXc6k",
    authDomain: "mera-jehlum.firebaseapp.com",
    projectId: "mera-jehlum",
    messagingSenderId: "1093409222171",
    appId: "1:1093409222171:web:e9c1d2113c6bb7ae2952be"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Message Handler
// Jab website band hogi, ye code notification dikhaye ga
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Background message received ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'icon.png', // Aapka favicon/logo
        badge: 'icon.png',
        vibrate: [200, 100, 200], // Mobile vibration pattern
        tag: 'namaz-alert', // Ek hi notification baar baar aaye to replace ho jaye
        renotify: true
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification par click karne se website khul jaye
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // Click karne par home page khulega
    );
});
