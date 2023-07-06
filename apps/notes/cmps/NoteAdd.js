export default{
    name:'NoteAdd',
    props:['newNote'],
    emits:['addNote'],
    template:`
            <form ref="noteForm"  @submit.prevent="addNote" class="add-note" >
                <input v-model="note.info.txt" type="text" placeholder="Write a note...">
                <hr />
            <button >save</button>
        </form>
    <pre>{{note}}</pre>
    `,
    data(){
        return{
            note: null, 
        }
    },
    created(){
        this.note = JSON.parse(JSON.stringify(this.newNote))
    },
    methods:{
        addNote(){
            const NoteToAdd = JSON.parse(JSON.stringify(this.note))
            this.$emit('addNote', NoteToAdd)
            // this.$refs.noteForm.reset()
            this.note.info.txt = ''
        },
    }
}