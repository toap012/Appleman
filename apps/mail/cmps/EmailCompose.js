export default {
    name: 'mail-new-draft',
    props: ['newDraft', 'logedUser'],
    template: `
        <section class="mail-new-draft">
           <pre>{{newDraft}}</pre>
           <pre>{{logedUser}}</pre>
           <button @click="close">X</button>
           <form @submit.prevent="sendMail" >
               <label htmlFor="from">From</label>
            <input type="text" name="from" id="from" placeholder="Your-Mail" v-model="mail.from"/>
            <label htmlFor="to">To</label>
            <input type="text" name="to" id="to"  autofocus required v-model="mail.to"/>
            <label htmlFor="subject"></label>
            <input type="text" name="subject" id="subject" v-model="mail.subject" />

            <button>Send</button>
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
        sendMail(isSend=true) {
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

