export default{
    name:'NoteTodos',
    props: ['info'],
    template:`
    <section class="note-todos">
        <h4>{{info.title}}</h4>
    <ul >
        <li v-for="todo in info.todos">
           * {{todo.txt}}
        </li>
    </ul>
    </section>
    `
}