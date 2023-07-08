import { mailService } from "../service/Mail.service.js"
import { showSuccessMsg, showErrorMsg, eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'mail-details',
    template: `
    <section class="mail-details" v-if="mail">
        <!-- <LongText :text="book.description"></LongText> -->
        <section class="mail-details-action-bar">
            <button @click="onBackToList"  class="material-symbols-outlined back btn" title="back to list">arrow_back</button>
            <div>
                <button @click="onDeleteMail" class="material-symbols-outlined btn" title="delete">delete</button>
                <button @click="onSaveNote" class="material-symbols-outlined btn" title="save as note">note</button>
            </div>
        </section>
        <h2>{{mail.subject}}</h2>
        <h3>from:{{mail.from}}</h3>
        <p class="mail-body">{{mail.body}}</p>
</section>
`,
    data() {
        return {
            mail: null,
            // isNotDraft: null
        }
    },
    created() {
        this.loadMail()
    },
    methods: {
        loadMail() {
            const { mailId } = this.$route.params
            mailService.get(mailId)
                .then(mail => {
                    this.mail = mail
                    if (this.mail.isRead) return
                    this.$emit('updateMail', this.mail)
                    this.mail.isRead = true
                    mailService.save(mail).then(mail => {
                        // this.isNotDraft = this.mail.sentAt ? true : false
                        // if(!this.isNotDraft) this.handleDraft(mail)
                                                   

                    })
                })
                .catch(err => {
                    showErrorMsg('Cannot load Mail')
                    this.$router.push('/mail/inbox')
                })
            },
        //     handleDraft(mail) {
        //         this.$router.push('/mail/inbox')
        //         eventBus.emit('editDraft', mail)
        // },
        onDeleteMail() {
            if (this.mail.removedAt) {
                mailService.remove(this.mail.id).then(removedMail => {
                    showSuccessMsg('mail removed')
                    this.$router.push('/mail/inbox')
                })
                return
            }
            this.mail.removedAt = Date.now()
            this.mail.isRead = true
            mailService.save(this.mail).then(mail => {
                showSuccessMsg('Mail sent to trash')
                this.$router.push('/mail/inbox')
            })
            // if (confirm('Are you sure?')) {
            //     mailService.remove(mailId)
            //         .then(mail => {
            //             console.log('Removed review')
            //             showSuccessMsg('Mail removed')

            //             this.$router.push('/mail')
            //         })
            //         .catch(err => {
            //             showErrorMsg('Cannot remove Mail')
            //         })
            // }
        },
        onBackToList() {
            this.$router.push('/mail/inbox')

        },
        onSaveNote() {
            const note = {
                type: 'noteMail',
                info: {
                    mail: this.mail
                },
            }
            eventBus.emit('note', note)

        }
    },
    components: {
        mailService,
    }
}