import NotePreview from "./NotePreview.js"

export default{
    name:'NoteList',
    props:['notes'],
    template:`
    <section class="note-list ">

        <article  v-for="(note, idx) in notes" :key="note.id">
            <NotePreview :cmp="note"/>
            <section class="actions">
                <button class="action-btn material-symbols-outlined" @click="onRemoveNote(note.id)">delete</button>
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