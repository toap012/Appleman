import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mailDB'
const LOGGED_USER_KEY = 'loggedUserDB'
const DRAFT_MAILS_KEY = 'draftMailsDB'

var gFilterBy = {}
var gSortBy = {}
var gPageIdx

_createMails()
_logUser()


export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId,
    getFilterBy,
    setFilterBy,
    getUnreadMailsCount,
    getLogedUser,
    getDraftMails,
    saveDraft
}
window.mailService = mailService

function query() {
    return storageService.query(MAIL_KEY)

    // .then(books => {
    //     if (gFilterBy.txt) {
    //         const regex = new RegExp(gFilterBy.txt, 'i')
    //         books = books.filter(car => regex.test(car.vendor))
    //     }
    //     if (gFilterBy.minSpeed) {
    //         books = books.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
    //     }
    //     if (gPageIdx !== undefined) {
    //         const startIdx = gPageIdx * PAGE_SIZE
    //         books = books.slice(startIdx, startIdx + PAGE_SIZE)
    //     }
    //     if (gSortBy.maxSpeed !== undefined) {
    //         books.sort((c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed)
    //     } else if (gSortBy.vendor !== undefined) {
    //         books.sort((c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor)
    //     }

    //     return books
    // })
}

function get(mailId) {

    return storageService.get(MAIL_KEY, mailId)
        .then(book => _setNextPrevMailId(book))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = utilService.makeLorem(50), isRead, to) {
    return {
        id: '',
        subject,
        body,
        isRead,
        sentAt: null,
        removedAt: null,
        from: 'momo@momo.com',
        to,
    }
}
function getLogedUser() {
    return utilService.loadFromStorage(LOGGED_USER_KEY)
}
function getDraftMails() {
    return storageService.query(DRAFT_MAILS_KEY)
}
function saveDraft(mail) {
    return storageService.post(DRAFT_MAILS_KEY, mail)
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}

function getUnreadMailsCount() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const unreadMailCount = mails.reduce((map, mail) => {
                if (!mail.isRead) map.unread++
                return map
            }, { unread: 0 })
            return unreadMailCount
        })
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
            mail.nexMailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
            mail.prevMailId = mails[mailIdx - 1]
                ? mails[mailIdx - 1].id
                : mails[mails.length - 1].id
            return mail
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Coockies', false, 'user@appleman.com'))
        mails.push(_createMail('Mind games', false, 'user@appleman.com'))
        mails.push(_createMail('Javascript', true, 'bla@appleman.com'))
        mails.push(_createMail('Remeber me?', true, 'agag@appleman.com'))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, isRead, to, body = utilService.makeLorem(5)) {
    const mail = getEmptyMail(subject, body, isRead, to)
    mail.id = utilService.makeId()
    mail.sentAt = Date.now()
    console.log(mail);
    return mail
}

function _logUser() {
    let loggedinUser = utilService.loadFromStorage(LOGGED_USER_KEY)
    if (!loggedinUser) {

        loggedinUser = {
            email: 'user@appleman.com',
            fullname: 'Mahatma Appsus'
        }
        utilService.saveToStorage(LOGGED_USER_KEY, loggedinUser)
    }
}