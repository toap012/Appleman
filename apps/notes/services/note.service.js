import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
const NOTE_KEY = 'noteDB'


_createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote
}
window.noteService = noteService

function query() {
    return storageService.query(NOTE_KEY).then(notes => {

        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}



function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}



function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}



function getEmptyNote(createdAt = new Date(), type = 'NoteTxt', isPinned = false) {
    return {
        id: '',
        createdAt,
        type,
        isPinned,
        style: { bgClr: 'red', clr: 'white' },
        info: {},
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://unsplash.it/100/100',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: '#00d'
                }
            }
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(createdAt, info, type, isPinned) {
    const note = getEmptyNote()
    note.id = utilService.makeId()
    note.info = info
    return note
}