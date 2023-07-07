export default {
    name: 'mail-new-draft',
    props: ['newDraft', 'logedUser'],
    template: `
        <section class="mail-new-draft">
            <div class="form-header">
                <section class="form-header-actions">
                    <button @click="close" class="form-header-btn">x</button>
                    <button class="form-header-btn">⇅</button>
                    <button class="form-header-btn">-</button>   
                </section>
                <h1 class="form-header">New Mail</h1>
            </div>
           <form @submit.prevent="sendMail" class="mail-form" >
                <div>   
                    <input type="text" name="from" id="from" placeholder="Your-Mail" v-model="mail.from"/>
                </div>
                <div>
                    <input type="text" name="to" id="to"  autofocus required v-model="mail.to" placeholder="To"/>
                </div>
                <div>
                    <input type="text" name="subject" id="subject" v-model="mail.subject" placeholder="Subject"/>
                </div>
                <div>
                    <textarea  name="body" id="body" v-model="mail.body" rows="" cols="" class="body-text-area"> </textarea>
                </div>
                <div class="mail-form-actions-bar">
                <div class="send"><button class="btn-send">send</button></div>
                <button @click="close(false)" class="btn-delete material-symbols-outlined">delete</button>
                </div>
           </form>
        </section>
    `,
    data() {
        return {
            mail: {
                from: this.logedUser.email,
                to: '',
                subject: '',
                body: ''
            }
        }
    },
    created() {

    },
    methods: {
        sendMail(isSend = true) {
            this.updtaeMail()
            this.$emit('sendMail', this.newDraft, isSend)
        },
        updtaeMail() {
            this.newDraft.from = this.mail.from
            this.newDraft.to = this.mail.to
            this.newDraft.subject = this.mail.subject
            this.newDraft.body = this.mail.body
        },
        close(isDraft = true) {
            if (!isDraft) {
                this.$emit('close')
                return
            }
            this.sendMail(false)
            this.$emit('close')

        }


    },
    computed: {


    }
}

