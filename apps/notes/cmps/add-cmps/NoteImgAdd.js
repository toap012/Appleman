export default{
    name:'NoteImgAdd',
    // props: ['info'],
    template:`
    <section class="note-img-add">
        <form   @submit.prevent="addNote" class="add-note" >
            <input type="text" v-model="note.info.title" placeholder="Add a title..." />
            <input type="url" v-model="note.info.url" placeholder="Add Url..." />
    
            <button class="action-btn save-btn material-symbols-outlined" >save</button>
        </form>
        
    </section>
    `,
    data(){
        return {
            note: {
                type: 'NoteImg',
                info: {
                    title: '',
                    url: ''
                }
            }
        }
    },
    methods:{
        addNote(){
            const noteToAdd = JSON.parse(JSON.stringify(this.note))
            this.$emit('addNote', noteToAdd)
            this.note.info.txt = ''
        }

        
    }
}