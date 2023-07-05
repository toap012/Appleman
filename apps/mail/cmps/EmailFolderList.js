export default {
    name: 'mail-folders-filter',
    template: `
        <section class="mail-folders-filter">
            <fieldset>
                <legend>Filter folders Mails</legend>
                <button @click="onSetFilterBy('#')">Mails</button>
                <button @click="onSetFilterBy('inbox')">inbox</button>
                <button @click="onSetFilterBy('sent')">sent</button>
                <button @click="onSetFilterBy('trash')">trash</button>
                <button @click="onSetFilterBy('draft')">draft</button>
            </fieldset>
        </section>
    `,
    data() {
        return {
            filterBy: {
                folder: '#'
            }
        }
    },
    methods: {
        onSetFilterBy(folder) {
            this.filterBy.folder = folder
            setTimeout(() => {
                this.$emit('filterByFolder', { ...this.filterBy })
            }, 300)
        }
    }
}

