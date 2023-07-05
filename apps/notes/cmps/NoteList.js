import NotePreview from "./NotePreview.js"

export default{
    name:'NoteList',
    props:['notes'],
    template:`
    <section class="note-list">

        <article  v-for="(note, idx) in notes">
            <NotePreview :cmp="note"/>
            <section class="actions">
                <button @click="onRemoveNote(note.id)">x</button>
            </section>
        </article>
    </section>
    
    `,
    methods: {
        onRemoveNote(noteId) {
                this.$emit('remove', noteId)
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