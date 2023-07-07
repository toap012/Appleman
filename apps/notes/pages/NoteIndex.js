import { noteService } from "../services/note.service.js"
import { showSuccessMsg, eventBus } from "../../../services/event-bus.service.js"

import NoteFilter from "../cmps/NoteFilter.js"
import NoteList from "../cmps/NoteList.js"
import NoteAdd from "../cmps/NoteAdd.js"
import { utilService } from "../../../services/util.service.js"

export default {
    name: 'notes-index',
    template: `
        <section class="notes-index ">
            <h1> hello notes</h1>
            <NoteFilter @filter="setFilterBy"/>
            <NoteAdd @addNote="addNewNote" :newNote="emptyNote" />
            <NoteList
            v-if="notes"
            :notes="filteredNotes"
            />
        </section>
    `,
    data() {
        return {
            notes: [],
            emptyNote: null,
            newNote: null,
            filterBy: null,
        }
    },
    mounted() {

    },
    computed: {
        filteredNotes() {
            if (!this.notes) return []
            if (!this.filterBy) return this.notes;
            let filteredNotes = this.notes


            // filterBy:{
            //     type:''
            // }
            if (this.filterBy.type) {
                filteredNotes = filteredNotes.filter(note => note.type === this.filterBy.type)
            }
            const regex = new RegExp(this.filterBy.txt, 'i');
            filteredNotes = filteredNotes.filter(note => regex.test(note.info.txt || note.info.title || note.info.todos.filter(todo => regex.test(todo.txt))));

            return filteredNotes
        }
    },
    created() {
        this.loadNotes()
        eventBus.on('remove', this.removeNote)
        eventBus.on('TogglePin', this.TogglePin)        // this.loadEmptyNote()

    },
    methods: {
        TogglePin(note) {
            note.isPinned = !note.isPinned
            noteService.save(note)
                .then(updatedNote => {
                    const idx = this.notes.findIndex(note => note.id === updatedNote.id)
                    this.notes.splice(idx, 1, updatedNote)
                })
        },
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
            // console.log(this.notes);
        },
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                })
                .catch(err => {
                    showErrorMsg('Cannot remove note')
                })
        },
        loadEmptyNote() {
            this.emptyNote = noteService.getEmptyNote()
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        addNewNote(newNote) {

            // newNote.id = ''
            this.newNote = newNote
            // console.log(this.newNote);
            noteService.save(this.newNote)
                .then(newNote => {
                    this.notes.push(newNote)
                    showSuccessMsg('note added')
                    this.$router.push('/notes')



                })
        }
    },


    watched: {

    },


    components: {
        NoteList,
        NoteFilter,
        NoteAdd,
    }
}
/**
 * another elegant way to filter:
 * if (!this.filterBy) {
  return this.notes;
}

const filterRegex = new RegExp(this.filterBy.txt, 'i');

const filteredNotes = this.notes.filter(note => {
  const { title, todos } = note.info;

  // Check if the filter regex matches the note's title
  if (title && filterRegex.test(title)) {
    return true;
  }

  // Check if any of the todos have a matching text
  if (todos && todos.some(todo => filterRegex.test(todo.txt))) {
    return true;
  }

  return false;
});

return filteredNotes;

 */