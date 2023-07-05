export default {
    template: `
        <section class="book-filter">
            <fieldset>
                <legend>Filter Mails</legend>
                <input 
                    v-model="filterBy.txt" 
                    @input="onSetFilterBy"
                    type="text" 
                    placeholder="search">
                
                
                <input type="checkbox" value="true" v-model="filterBy.isRead" @input="onSetFilterBy"/> Read
                <input type="checkbox" value="false" v-model="filterBy.isRead" @input="onSetFilterBy"/> Unread
            </fieldset>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                isRead: undefined
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', {...this.filterBy})
        }
    }
}

