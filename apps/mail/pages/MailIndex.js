import { mailService } from "../service/Mail.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import EmailCompose from '../cmps/EmailCompose.js'


export default {
    name: 'mail-index',
    template: `
        <section class="mail-index">
            <EmailCompose 
                v-if="newDraft"
                :newDraft="newDraft"
                :logedUser="logedUser"
                @sendMail="sendMail"
                @close="closeWindow"/>
            <MailFilter @filter="setFilterBy"/>
            <!-- <span>unRead mails: {{unRead}}</span> -->
            <EmailFolderList @filterByFolder="setFilterByFolder" @click="newMail"/>
            <!-- <MailList
                v-if="mails"
                :mails="filteredMails"/> -->
            <RouterView :mails="filteredMails" />
        </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: {
                folder: '#'
            },
            newDraft: null,
            logedUser: '',
            unRead: 0
        }
    },
    watch: {
        mails(){
            this.loadMails()
        } 
    },
    created() {
        this.loadMails()
        this.getLogedUser()
        this.getUnreadMailsCount()
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => {
                    this.mails = mails
                })
        },
        getLogedUser() {
            this.logedUser = mailService.getLogedUser()
        },
        getUnreadMailsCount() {
            mailService.getUnreadMailsCount().then(map => this.unRead = map.unread)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        setFilterByFolder(filter) {
            this.filterBy.folder = filter.folder
        },
        newMail() {
            this.newDraft = mailService.getEmptyMail()
        },
        sendMail(mail, isSend) {
            console.log(mail.subject);
            if (isSend) {
                mail.sentAt = Date.now()
                mailService.save(mail)
                    .then(mail => {
                        showSuccessMsg('mail sent succesfuly')
                    })
                    .catch(err => {
                        showErrorMsg('mail could not be sent')
                    })
            } else if (mail.subject) {
                mail.isDraft = true
                mailService.save(mail)
                    .then(draftMail => {
                        showSuccessMsg('Mail Added to Draft')
                    })

            }
            this.loadMails()
            this.newDraft = null
        },
        closeWindow() {
            this.newDraft = null
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
                switch (this.filterBy.folder) {
                    case 'inbox':
                        console.log('ok')
                        filteredMails = filteredMails.filter(mail => mail.to === logedUser.email)
                        break;
                    case 'sent':
                        filteredMails = filteredMails.filter(mail => mail.to !== logedUser.email && !mail.isDraft)
                        break;
                    case 'trash':
                        filteredMails = filteredMails.filter(mail => mail.removedAt !== null)
                        break;
                    case 'draft':
                        filteredMails = filteredMails.filter(mail => mail.isDraft === true)
                        break;
                    case '#':
                        filteredMails = filteredMails.filter(mail => mail.isDraft !== true && !mail.removedAt)
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
        EmailFolderList,
        EmailCompose
    }
}