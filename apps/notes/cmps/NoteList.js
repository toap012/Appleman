import NotePreview from "./NotePreview.js"

export default{
    name:'NoteList',
    props:['notes'],
    template:`
    <TransitionGroup name="list" tag="section">

        <TransitionGroup :notes="bindNotes" v-if="notes" class="note-list" name="note" tag="section">
            <article  v-for="(note) in pinnedNotes"  :key="note.id">
                <NotePreview  :cmp="note"/>
            </article>
        </TransitionGroup>

        <TransitionGroup :notes="bindNotes" v-if="notes" class="note-list" name="note" tag="section">
            <article  v-for="(note) in unPinnedNotes"  :key="note.id">
                <NotePreview  :cmp="note"/>
            </article>
        </TransitionGroup>
    </TransitionGroup>
    
    `,
    data(){
        return{
            pinnedNotes:null,
            unPinnedNotes:null
        }
    },
    methods: {
        onRemoveNote(noteId) {
                this.$emit('remove', noteId)
            }
        },


    created(){
    },
    computed:{
        bindNotes(){
            this.pinnedNotes = this.notes.filter(note=>note.isPinned)
            this.unPinnedNotes = this.notes.filter(note=>!note.isPinned)
            }
        },


    components:{
        NotePreview,
    }
}
/**
 *<component :is="cmp.type" :info="cmp.info"
    @changeInfo="updateNote" />
 */