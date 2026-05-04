"use client";

import { useEffect } from 'react';

export default function PwaRegistry() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('PWA: Service Worker registrado exitosamente');
          },
          function(err) {
            console.log('PWA: Fallo al registrar el Service Worker', err);
          }
        );
      });
    }
  }, []);

  return null;
}
