import { mailService } from "../service/Mail.service.js"

import MailList from '../cmps/MailList.js'


export default {
    name: 'mail-index',
    template: `
        <section class="mail-index">
            <h1> hello mail</h1>
            <MailList
                v-if="mails"
                :mails="filteredMails"
                />
        </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: {},
        }
    },
    created() {
        this.loadMails()
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails)
        }
    },
    computed: {
        filteredMails(){
            return this.mails
        }
    },
    components: {
        mailService,
        MailList
    }
}