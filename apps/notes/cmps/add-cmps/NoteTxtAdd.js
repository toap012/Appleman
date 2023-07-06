export default{
    name:'NoteTxtAdd',
    // props: ['info'],
    template:`
    <section class="note-txt-add">
        <form   @submit.prevent="addNote" class="add-note" >
            <textarea v-model="note.info.txt" type="text" placeholder="Write a note..."></textarea>
    
            <button class="action-btn save-btn material-symbols-outlined">save</button>
        </form>
        
    </section>
    `,
    data(){
        return {
            note: {
                type: 'NoteTxt',
                info: {
                    txt: ''
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