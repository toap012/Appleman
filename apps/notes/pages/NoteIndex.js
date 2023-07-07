import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

import NoteFilter from "../cmps/NoteFilter.js"
import NoteList from "../cmps/NoteList.js"
import NoteAdd from "../cmps/NoteAdd.js"

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
    data(){
        return{
            notes:[],
            emptyNote:null ,
            newNote:null,
            filterBy: null,
        }
    },
    computed: {
        filteredNotes() {
            if (!this.filterBy) return this.notes;
            const regex = new RegExp(this.filterBy.txt, 'i');
            return this.notes.filter(note => regex.test(note.info.txt || note.info.title || note.info.todos.filter(todo => regex.test(todo.txt))));
            

        }
    },
    created(){
        this.loadNotes()
        eventBus.on('remove',this.removeNote)
        eventBus.on('TogglePin',this.TogglePin)        // this.loadEmptyNote()
        
    },
    methods:{
        TogglePin(note){
            note.isPinned=!note.isPinned
            noteService.save(note)
                .then(()=>{

                })
        },
        loadNotes(){
            noteService.query()
            .then(notes=>this.notes = notes)
            console.log(this.notes);
        },
        removeNote(noteId){
            noteService.remove(noteId)
                .then(()=>{
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                })
                .catch(err => {
                    showErrorMsg('Cannot remove note')
                })
        },
        loadEmptyNote(){
            this.emptyNote = noteService.getEmptyNote()
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        addNewNote(newNote){
            this.newNote = newNote
            console.log(this.newNote);
            noteService.save(this.newNote)
                .then(()=>{
                    this.loadNotes()
                
                })
        }
    },


    watched:{

    },


    components:{
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