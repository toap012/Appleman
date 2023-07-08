import NoteTxtAdd from "./add-cmps/NoteTxtAdd.js"
import NoteImgAdd from "./add-cmps/NoteImgAdd.js"
import { eventBus } from "../../../services/event-bus.service.js"
export default {
    name: 'NoteAdd',
    emits: ['addNote'],
    template: `
    <section class="add-note">
        <component :is="type" @addNote="addNote" />
        <section class="main-actions">
            <button class="action-btn material-symbols-outlined" title="Add-text-button" @click="changeType('NoteTxtAdd')">text_fields</button>
            <button class="action-btn material-symbols-outlined" title="Add-image-button" @click="changeType('NoteImgAdd')">image</button>
            <button class="action-btn material-symbols-outlined" title="Todo-button" @click="changeType('NoteTodoAdd')">checklist</button>
        </section>
    </section>
    `,
    data() {
        return {
            type: 'NoteTxtAdd',
            isPinned: true
        }
    },
    created() {
        eventBus.on('note', this.addNote)
    },
    methods: {
        addNote(note) {
            // const NoteToAdd = JSON.parse(JSON.stringify(this.note))
            console.log(note);
            note.createdAt = Date.now()
            note.style = {}
            note.isPinned = this.isPinned
            const newNote = JSON.parse(JSON.stringify(note))
            this.$emit('addNote', newNote)
            // this.$refs.noteForm.reset()

        },
        changeType(type) {
            this.type = type
        }
        // calcHeight(value) {
        //     let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        //     // min-height + lines x line-height + padding + border
        //     let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        //     return newHeight;
        //   },
    },
    components: {
        NoteTxtAdd,
        NoteImgAdd
    }
}