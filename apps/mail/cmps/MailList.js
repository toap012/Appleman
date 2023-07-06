import MailPreview from './MailPreview.js'



export default {
    name: 'mail-list',
    props: ['mails'],
    template: `
        <section class="mail-list" v-if="mails">
           <h1> mail list</h1>
           <ul>
            <li v-for="mail in mails" :key="mail.id">
                <MailPreview :mail="mail"/>
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

    },
    computed: {

    },
    components: {
        MailPreview
    }
}