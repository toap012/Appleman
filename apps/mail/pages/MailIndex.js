import { mailService } from "../service/Mail.service.js"

import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'


export default {
    name: 'mail-index',
    template: `
        <section class="mail-index">
            <h1> hello mail</h1>
            <MailFilter :filter="setFilterBy"/>
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
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredMails() {
            //filter validaition
            if (!this.filterBy) return this.mails

            //filtering
            let filteredMails = this.mails

            if (this.filterBy.txt) {
                const regex = new RegExp(this.filterBy.txt, 'i')
                filteredMails = filteredMails.filter(mail => regex.test(mail.subject))
            }

            if (this.filterBy.isRead !== undefined) {
                filteredMails = filteredMails.filter(mail => mail.isRead = this.filterBy.isRead)
            }

            return filteredMails
        },
    },
    components: {
        mailService,
        MailList,
        MailFilter
    }
}