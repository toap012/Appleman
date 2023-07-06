export default {
    name: 'mail-preview',
    props: ['mail'],
    template: `
    <article class="mail-row">
        <RouterLink :to="'/mail/' + mail.id">
            <article class="mail-preview" :class="this.isReadClass">
                <span class="material-symbols-outlined">check_box_outline_blank</span>
                <span class="from">from:{{mail.from}}</span>
                <span class="subject">{{mail.subject}}</span>
                <p class="body-prev">{{mail.body}}</p>
                <!-- <RouterLink :to="'/mail/edit/' + mail.id">Edit</RouterLink> -->
            </article>
        </RouterLink> 
        <div class="preview-icons">
            <span class="material-symbols-outlined">delete</span>
            <span class="material-symbols-outlined" @click="toogleRead">{{this.isReadIcon}}</span>
        </div>
    </article>
    `,
    data() {
        return {
            isReadIcon: '',
            isReadClass: ''
            // isMailRead: this.mail.isRead
        }
    },
    watch: {
        
    },
    created() {
        this.isMailRead()
    },
    methods: {
        toogleRead() {
            if(this.mail.isRead) this.mail.isRead =false
            if(!this.mail.isRead) this.mail.isRead =true
            console.log(this.mail.isRead);
            this.isMailRead()
        },
        isMailRead() {
            this.isReadIcon = this.mail.isRead ? 'mail' : 'drafts'
            this.isReadClass = this.mail.isRead ? 'read' : 'unread'
            console.log(this.isReadIcon ,this.isReadClass);
        },


    },
    computed: {

    }
}