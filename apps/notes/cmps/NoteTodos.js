export default{
    name:'NoteTodos',
    props: ['info'],
    template:`
    <section class="note-todos">
        <h4>{{info.title}}</h4>
    <ul v-for="todo in info.todos">
        <li>
            {{todo}}
        </li>
    </ul>
    </section>
    `
}