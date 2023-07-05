import { noteService } from "../services/note.service.js"


import NoteFilter from "../cmps/NoteFilter.js"
import NoteList from "../cmps/NoteList.js"

export default {
    name: 'notes-index',
	template: `
        <section class="notes-index">
            <h1> hello notes</h1>
            <NoteFilter @filter="setFilterBy"/>
            <NoteList
            v-if="notes"
            :notes="filteredNotes"
            @remove="removeNote"
            />
        </section>
    `,
    data(){
        return{
            notes:[],
            filterBy: null,
        }
    },
    computed: {
        filteredNotes() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy.txt, 'i')
            return  this.notes.filter(note => regex.test(note.info.txt||note.info.title||note.info.todos.filter(todo=>todo.txt).join('')))

        }
    },
    created(){
        noteService.query()
        .then(notes=>this.notes = notes)
    },
    methods:{
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
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    components:{
       NoteList,
       NoteFilter,
    }
}