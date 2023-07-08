import { mailService } from "../service/Mail.service.js"
import { showSuccessMsg, showErrorMsg, eventBus } from '../../../services/event-bus.service.js'

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
            <EmailFolderList @filterByFolder="setFilterByFolder" @newMail="newMail"/>
            <!-- <MailList
                v-if="mails"
                :mails="filteredMails"/> -->
            <RouterView :mails="filteredMails" @updateMail="updateMail" @removeMail="removeMail" />
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
    created() {
        this.loadMails()
        this.getLogedUser()
        this.getUnreadMailsCount()
        // eventBus.on('editDraft', this.newMail)
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => {
                    this.mails = mails
                })
        },
        updateMail(mail) {
            mailService.save(mail).then(updatedMail => {
                const mailIdx = this.mails.findIndex(m => m.id === updatedMail.id)
                this.mails.splice(mailIdx, 1, updatedMail)
                showSuccessMsg('updated')
            })
        },
        removeMail(mailId) {
            mailService.remove(mailId).then(removedMail => {
                const mailIdx = this.mails.findIndex(m => m.id === mailId)
                this.mails.splice(mailIdx, 1)
                showSuccessMsg('mail removed')

            })
        },
        getLogedUser() {
            this.logedUser = mailService.getLogedUser()
        },
        getUnreadMailsCount() {
            mailService.getUnreadMailsCount().then(map => this.unRead = map.unread)
        },
        setFilterBy(filterBy) {
            // this.fitler.txt = txt
            this.filterBy = filterBy
        },
        setFilterByFolder(filter) {
            this.filterBy.folder = filter.folder
        },
        newMail(draftMail) {
            if (draftMail) return this.newDraft = draftMail
            this.newDraft = mailService.getEmptyMail()
        },
        sendMail(mail, isSend) {
            console.log(mail.subject);
            if (isSend) {
                mail.sentAt = Date.now()
                mailService.save(mail)
                    .then(mail => {
                        showSuccessMsg('mail sent succesfuly')
                        this.mails.push(mail)

                    })
                    .catch(err => {
                        showErrorMsg('mail could not be sent')
                    })
            } else if (mail.subject) {
                mail.isDraft = true
                mailService.save(mail)
                    .then(draftMail => {
                        showSuccessMsg('Mail Added to Draft')
                        this.mails.push(mail)
                    })

            }
            // this.loadMails()
            this.newDraft = null
        },
        closeWindow() {
            this.newDraft = null
        },

    },
    computed: {
        filteredMails() {
            //filter validaition
            if (!this.mails) return []
            if (!this.filterBy) return this.mails
            let filteredMails = this.mails
            //folders
            if (this.filterBy.folder) {
                let logedUser = mailService.getLogedUser()
                switch (this.filterBy.folder) {
                    case 'inbox':
                        filteredMails = filteredMails.filter(mail => mail.to === logedUser.email && !mail.removedAt)
                        break;
                    case 'sent':
                        filteredMails = filteredMails.filter(mail => mail.from === logedUser.email && !mail.isDraft)
                        break;
                    case 'trash':
                        filteredMails = filteredMails.filter(mail => mail.removedAt !== null)
                        break;
                    case 'draft':
                        filteredMails = filteredMails.filter(mail => mail.isDraft)
                        break;
                    case 'stars':
                        filteredMails = filteredMails.filter(mail => mail.isStar)
                        break;
                    case '#':
                        filteredMails = filteredMails.filter(mail => !mail.isDraft && !mail.removedAt)
                }
            }
            //filtering

            if (this.filterBy.txt) {
                const regex = new RegExp(this.filterBy.txt, 'i')
                filteredMails = filteredMails.filter(mail => regex.test(mail.subject))
            }

            if (this.filterBy.isRead && this.filterBy.isRead !== 'all') {
                // console.log(this.filterBy.isRead);
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