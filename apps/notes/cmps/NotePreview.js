export default{
    name:
    'NotePreview',
    props: ['cmp'],
    template:`
    <article>
        <component :is="cmp.type" :info="cmp.info"
        @changeInfo="updateNote" />
    </article>
    `,
    created(){
        console.log(this.cmp);
    },

}