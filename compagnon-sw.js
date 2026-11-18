
 // Compagnon du Seuil — service worker
 // Préparation aux futures notifications.

self.addEventListener('push', event => {
  const title = 'Compagnon du Seuil';
  const body = 'Une interpellation t’attend.';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: './compagnon-icon-192.png',
      badge: './compagnon-icon-192.png',
      tag: 'compagnon-interpellation',
      data: { url: './compagnon.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const target = new URL(
    './compagnon.html',
    self.registration.scope
  ).href;

  event.waitUntil((async () => {
    const windows = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });

    for (const windowClient of windows) {
      if (
        windowClient.url === target &&
        'focus' in windowClient
      ) {
        return windowClient.focus();
      }
    }

    return clients.openWindow(target);
  })());
});
