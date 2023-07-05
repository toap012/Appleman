export default {
    props: ['mail'],
    template: `
    <article class="mail-preview" :class="isRead">
        <h3>from:{{mail.from}}</h3>
        <h3>{{mail.subject}}</h3>
        <p>{{mail.body}}</p>
        <RouterLink :to="'/mail/' + mail.id"></RouterLink> 
        <!-- <RouterLink :to="'/mail/edit/' + mail.id">Edit</RouterLink> -->
    </article>
    `,
    computed: {
        isRead() {
            console.log(this.mail);
            return this.mail.isRead ? 'read' : 'unread'
        }
    }
}