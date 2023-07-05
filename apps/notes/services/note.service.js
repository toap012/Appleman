import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
const PAGE_SIZE = 5
const NOTE_KEY = 'noteDB'

// var gFilterBy = { txt: '', minSpeed: 0 }
// var gSortBy = { vendor: 1 }
// var gPageIdx

_createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
}
window.noteService = noteService

function query() {
    return storageService.query(NOTE_KEY).then(notes => {
        // if (gFilterBy.txt) {
        //     const regex = new RegExp(gFilterBy.txt, 'i')
        //     cars = cars.filter(car => regex.test(car.vendor))
        // }
        // if (gFilterBy.minSpeed) {
        //     cars = cars.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
        // }
        // if (gPageIdx !== undefined) {
        //     const startIdx = gPageIdx * PAGE_SIZE
        //     cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
        // }
        // if (gSortBy.maxSpeed !== undefined) {
        //     cars.sort(
        //         (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
        //     )
        // } else if (gSortBy.vendor !== undefined) {
        //     cars.sort(
        //         (c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor
        //     )
        // }

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



function getEmptyNote(createdAt = new Date(),type ='NoteTxt', isPinned = false) {
    return { 
     id: '',
     createdAt,
     type,
     isPinned,
     style:{bgClr:'red',clr:'white'},
     info:{txt:''}, 
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
                url: 'http://some-img/me',
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
                }
                }
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(createdAt,info,type,isPinned) {
    const note = getEmptyNote()
    note.id = utilService.makeId()
    note.info = info
    return note
}