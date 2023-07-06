import MailPreview from './MailPreview.js'



export default {
    name: 'mail-list',
    props: ['mails'],
    template: `
        <section class="mail-list" v-if="mails">
           <ul>
            <li v-for="mail in mails" :key="mail.id">
                <MailPreview :mail="mail" @updateMail="updateMail" @removeMail="removeMail"/>
                <section class="mail-actions">
                    <!-- <button @click="onRemoveMail(mail.id)">x</button> -->
                </section>
            </li>
           </ul>
        </section>
    `,
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        updateMail(mail){
            this.$emit('updateMail', mail)
        },
        removeMail(mailId){
            this.$emit('removeMail', mailId)
        }
    },
    computed: {

    },
    components: {
        MailPreview
    }
}