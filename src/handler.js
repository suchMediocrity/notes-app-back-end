/* eslint-disable */

/**
 * handler.js
 * Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.
 */
const { nanoid } = require('nanoid');
const notes = require('./notes');

// fungsi menambah catatan
const addNoteHandler = (request, h) => {
    // Variabel-variabel penyusn note dari klien

    // Variabel inputan klien: title, tags, body
    const { title, tags, body } = request.payload;
    
    // Id notes
    const id = nanoid(16);

    // variabel createdAt
    // new Date () menghasilkan objek
    // toISOString mengonversi date menjadi format string
    const createdAt = new Date().toISOString();

    // variabel updatedAt
    const updatedAt = createdAt;

    // metode membuat note baru
    const newNote = {title, tags, body, id, createdAt, updatedAt,};

    // Memasukan note baru ke modul notes.js
    notes.push(newNote);

    // Variabel penentu apakah notes sudah masuk atau belum
    // menghasilkan true atau false
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil ditambahkan',
            data: {
                noteId: id,
            }
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal ditambahkan'
    });
    
    response.code(500);
    return response;
};

// Fungsi menampilkan daftar notes yang telah disimpan
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// Fungsi melihat detail suatu note yang telah disimpan
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;

    const updatedAt = new Date().toISOString();

    const index = note.findIndex((note) => note.id === id);

    if (index !== 1) {
        notes[index] = {
            ...notes[index],
            title, 
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan, Id catatan tak ditemukan',
    });

    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = notes.findIndex((note) => note.id === id);
   
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
   
   const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus, ID tak ditemukan',
   });
    response.code(404);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };