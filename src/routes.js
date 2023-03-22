/* eslint-disable */
/**
 * routes.js
 * Memuat kode konfigurasi routing server, seperti menentukan path, method, dan handler yang digunakan.
 */

const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
    {
        // Menambahkan dan menyimpan notes
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        // Melihat daftar keseluruhan notes
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        // Melihat detail notes (berdasarkan id)
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        // Mengubah note
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        // Menghapus note
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;