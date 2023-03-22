/* eslint-disable */

/**
 * server.js
 * Memuat kode untuk membuat, mengonfigurasi, dan menjalankan HTTP server menggunakan Hapi.
 */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
  
// Deklarasi dan membuat server (berdasarkan HAPI)
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*'],
        },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// Memanggil server
init();