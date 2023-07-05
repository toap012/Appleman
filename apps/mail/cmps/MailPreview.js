export default {
    name: 'mail-preview',
    props: ['mail'],
    template: `
        <RouterLink :to="'/mail/' + mail.id">
            <article class="mail-preview" :class="isRead">
                <span>{{this.isReadIcon}}</span>
                <h3>from:{{mail.from}}</h3>
                <h3>{{mail.subject}}</h3>
                <p>{{mail.body}}</p>
                
                <!-- <RouterLink :to="'/mail/edit/' + mail.id">Edit</RouterLink> -->
            </article>
        </RouterLink> 
    `,
    data() {
        return {
            isReadIcon: this.mail.isRead ? '🟢' : '🟡'
        }
    },
    created() {

    },
    methods: {

    },
    computed: {
        isRead() {
            return this.mail.isRead ? 'read' : 'unread'
        }
    }
}