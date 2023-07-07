import NoteTxtAdd from "./add-cmps/NoteTxtAdd.js"
import NoteImgAdd from "./add-cmps/NoteImgAdd.js"
export default{
    name:'NoteAdd',
    emits:['addNote'],
    template:`
    <section class="add-note">
        <component :is="type" @addNote="addNote" />
        <section class="main-actions">
            <button class="action-btn material-symbols-outlined" title="Add-text-button" @click="changeType('NoteTxtAdd')">text_fields</button>
            <button class="action-btn material-symbols-outlined" title="Add-image-button" @click="changeType('NoteImgAdd')">image</button>
            <button class="action-btn material-symbols-outlined" title="Todo-button" @click="changeType('NoteTodoAdd')">checklist</button>
        </section>
    </section>
    `,
    data(){
        return{
            type: 'NoteTxtAdd',
            isPinned:true
        }
    },
    created(){

    },
    methods:{
        addNote(note){
            note.createdAt = Date.now()
            note.style = {}
            note.isPinned = this.isPinned
            this.$emit('addNote', note)
            // this.$refs.noteForm.reset()
            
        },
        changeType(type){
            this.type = type
        }
    },
    components: {
        NoteTxtAdd,
        NoteImgAdd
    }
}
// const NoteToAdd = JSON.parse(JSON.stringify(this.note))
        // calcHeight(value) {
        //     let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        //     // min-height + lines x line-height + padding + border
        //     let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        //     return newHeight;
        //   },