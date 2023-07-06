export default{
    name:'NoteTxt',
    props: ['info'],
    template:`
    <section class="note-text">
        <p style="white-space: pre-line;">{{ info.txt }}</p>
    </section>
    `,  

}