export default{
    name:'NoteTxt',
    props: ['info'],
    template:`
    <section class="note-text">
        <h3>{{info.txt}}</h3>
    </section>
    `,  

}