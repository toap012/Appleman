export default{
    name:'NoteImg',
    props: ['info'],
    template:`
    <section class="note-img">
        <!-- <p>{{imgTitle}}</p> -->
        <img :src="imgUrl" :title="imgTitle" :alt="imgTitle"  />
    </section>
    `,
    computed:{
        imgUrl(){
            return this.info.url
        },
        imgTitle(){
            return this.info.title
        },

        
    }
}