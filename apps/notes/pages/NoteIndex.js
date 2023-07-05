import { noteService } from "../services/note.service.js"
import NoteList from "../cmps/NoteList.js"
export default {
    name: 'notes-index',
	template: `
        <section class="notes-index">
            <h1> hello notes</h1>
            <NoteList
            v-if="notes"
            :notes="notes"
            @remove="removeNote"
            />
        </section>
    `,
    data(){
        return{
            notes:[]
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
    },
    components:{
       NoteList,
    }
}