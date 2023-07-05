export default{
    name:'NoteImg',
    props: ['info'],
    template:`
    <section class="note-img">
<img :src="imgUrl" :title="imgTitle" :alt="imgTitle"  />
    </section>
    `,
    computed:{
        imgUrl(){
            console.log(this.info.url)
            return this.info.url
        },
        imgTitle(){
            return this.info.title
        },

        
    }
}