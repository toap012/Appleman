export default {
    name: 'NoteMail',
    props: ['info'],
    template: `
    <section class="note-text">
        <h4>{{this.info.mail.subject}}</h4>
        <h1>From: {{this.info.mail.from}}</h1>
        <p>{{this.info.mail.body}}</p>
    </section>
    `,

}