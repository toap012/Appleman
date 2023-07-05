import { mailService } from "../service/Mail.service.js"

import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'
import EmailFolderList from '../cmps/EmailFolderList.js'


export default {
    name: 'mail-index',
    template: `
        <section class="mail-index">
            <h1> hello mail</h1>
            <MailFilter @filter="setFilterBy"/>
            <EmailFolderList @filterByFolder="setFilterByFolder"/>
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
        setFilterByFolder(filter) {
            this.filterBy.folder = filter.folder
        }
    },
    computed: {
        filteredMails() {
            //filter validaition
            if (!this.filterBy) return this.mails
            let filteredMails = this.mails

            //folders
            if (this.filterBy.folder) {
                let logedUser = mailService.getLogedUser()

                console.log(logedUser);
                switch (this.filterBy.folder) {
                    case 'inbox':
                        console.log('ok')
                        filteredMails = filteredMails.filter(mail => mail.to === logedUser.email)
                        break;
                    case 'sent':
                        filteredMails = filteredMails.filter(mail => mail.to !== logedUser.email)
                        break;
                    case 'trash':
                        mailService.getTrash().then(trashMails => filteredMails = trashMails).catch(filteredMails=[])
                        break;
                    case 'draft':
                        mailService.getDraftMails().then(draftMails => filteredMails = draftMails).catch(filteredMails=[])
                        break;

                }
            }
            //filtering

            if (this.filterBy.txt) {
                const regex = new RegExp(this.filterBy.txt, 'i')
                filteredMails = filteredMails.filter(mail => regex.test(mail.subject))
            }

            if (this.filterBy.isRead && this.filterBy.isRead !== 'all') {
                console.log(this.filterBy.isRead);
                if (this.filterBy.isRead === 'true') {
                    filteredMails = filteredMails.filter(mail => mail.isRead === true)
                } else {
                    filteredMails = filteredMails.filter(mail => mail.isRead === false)
                }
            }

            return filteredMails
        },
    },
    components: {
        mailService,
        MailList,
        MailFilter,
        EmailFolderList
    }
}