// import { mailService } from "../service/Mail.service"

export default {
    name: 'mail-preview',
    props: ['mail'],
    template: `
    <article class="mail-row">
        <span class="material-symbols-outlined checkbox" :class="isStared" @click.stop="toggleStar">star</span>
        <RouterLink :to="'/mail/' + mail.id">
            <article class="mail-preview" :class="this.isReadClass">
                <span class="from">from:{{mail.from}}</span>
                <span class="subject">{{mail.subject}}</span>
                <span class="body-prev">{{mail.body}}</span>
                <!-- <RouterLink :to="'/mail/edit/' + mail.id">Edit</RouterLink> -->
            </article>
        </RouterLink> 
        <div class="preview-icons">
            <span  @click.stop="handleRemove">

                <span  class="material-symbols-outlined">delete</span>
            </span>
            <span @click.stop="toogleRead">

                <span  class="material-symbols-outlined" >{{isReadIcon}}</span>
            </span>
        </div>
    </article>
    `,
    data() {
        return {
            // isReadIcon: '',
            // isReadClass: ''
            // isMailRead: this.mail.isRead
        }
    },
    methods: {
        toogleRead() {
            const mailToUpdate = JSON.parse(JSON.stringify(this.mail))
            mailToUpdate.isRead = !mailToUpdate.isRead
            this.$emit('updateMail', mailToUpdate)
        },
        toggleStar(){
            const mailToUpdate = JSON.parse(JSON.stringify(this.mail))
            mailToUpdate.isStar = !mailToUpdate.isStar
            this.$emit('updateMail', mailToUpdate)
        },
        handleRemove() {
            if (this.mail.removedAt) {
                this.$emit('removeMail', this.mail.id)
            } else {
                const mailToUpdate = JSON.parse(JSON.stringify(this.mail))
                mailToUpdate.removedAt = Date.now()
                this.$emit('updateMail', mailToUpdate)
            }
        },

    },
    computed: {
        isReadClass() {
            return this.mail.isRead ? 'read' : 'unread'
        },
        isReadIcon() {
            return this.mail.isRead ? 'mail' : 'drafts'
        },
        isStared() {
            return this.mail.isStar ? 'stared' : ''
        }
    }
}