import NotePreview from "./NotePreview.js"

export default{
    name:'NoteList',
    props:['notes'],
    template:`
    <section :notes="bindNotes" v-if="notes" class="note-list ">
        <article  v-for="(note) in pinnedNotes"  :key="note.id">
                <NotePreview  :cmp="note"/>

        </article>
    </section>
    <section :notes="bindNotes" v-if="notes" class="note-list ">
        <article  v-for="(note) in unPinnedNotes"  :key="note.id">
                <NotePreview  :cmp="note"/>
        </article>
</section>
    
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
            // console.log(this.pinnedNotes);
            // console.log(this.notes);
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