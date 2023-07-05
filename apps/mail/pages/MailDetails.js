import { mailService } from "../service/Mail.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    name: 'mail-details',
    template: `
    <section class="mail-details" v-if="mail">
        <!-- <LongText :text="book.description"></LongText> -->
        <h3>from:{{mail.from}}</h3>
        <h3>{{mail.subject}}</h3>
        <p>{{mail.body}}</p>
        <button @click="onDeleteMail(mail.id)">Delete Mail</button>
        <button @click="onBackToList">Back to List</button>
</section>
`,
    data() {
        return {
            mail: null
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
                    console.log(mail);
                })
                .catch(err => {
                    showErrorMsg('Cannot load Mail')
                    this.$router.push('/mail')
                })
        },
        onDeleteMail(mailId) {
            if (confirm('Are you sure?')) {
                mailService.remove(mailId)
                    .then(mail => {
                        console.log('Removed review')
                        showSuccessMsg('Mail removed')
                        this.$router.push('/mail')
                    })
                    .catch(err => {
                        showErrorMsg('Cannot remove Mail')
                    })
            }
        },
        onBackToList() {
            this.$router.push('/mail')

        }
    },
    components: {
        mailService,
    }
}