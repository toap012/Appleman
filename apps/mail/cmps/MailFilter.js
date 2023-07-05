export default {
    name: 'mail-filter',
    template: `
        <section class="mail-filter">
            <fieldset>
                <legend>Filter Mails</legend>
                <input 
                    v-model="filterBy.txt" 
                    @input="onSetFilterBy"
                    type="text" 
                    placeholder="search"/>
                
                
                <input type="radio" value="all"  v-model="filterBy.isRead" @input="onSetFilterBy"/>All
                <input type="radio" value="true"  v-model="filterBy.isRead" @input="onSetFilterBy"/>Read
                <input type="radio" value="false"  v-model="filterBy.isRead" @input="onSetFilterBy"/>Unread 
            </fieldset>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                isRead: 'all'
            }
        }
    },
    methods: {
        onSetFilterBy() {
            setTimeout(() => {
                this.$emit('filter', { ...this.filterBy })
            }, 300)
        }
    }
}

