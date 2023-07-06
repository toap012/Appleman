export default {
    name: 'mail-new-draft',
    props: ['newDraft', 'logedUser'],
    template: `
        <section class="mail-new-draft">
           <button @click="close" class="close-form-btn">X</button>
           <h1 class="form-header">New Mail</h1>
           <form @submit.prevent="sendMail" class="mail-form" >
                <div>
                    <div>
                        <label htmlFor="from">From</label>
                    </div>    
                    <input type="text" name="from" id="from" placeholder="Your-Mail" v-model="mail.from"/>
                </div>
                <div>
                    <div>
                        <label htmlFor="to">To</label>
                    </div>
                    <input type="text" name="to" id="to"  autofocus required v-model="mail.to"/>
                </div>
                <div>
                    <div>
                        <label htmlFor="subject">Subject</label>
                    </div>
                    <input type="text" name="subject" id="subject" v-model="mail.subject" />
                </div>
                <div class="mail-form-actions-bar">
                    <button><span class="material-symbols-outlined btn-send">send</span></button>
                </div>
           </form>
        </section>
    `,
    data() {
        return {
            mail: {
                from: this.logedUser.email,
                to: '',
                subject: ''
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
        },
        close() {
            this.sendMail(false)
            this.$emit('close')

        }


    },
    computed: {


    }
}

