export default {
    name: 'mail-filter',
    template: `
        <section class="mail-filter">
            
        <div class="search-bar">
            <span class="material-symbols-outlined search-icon">search</span>
            <input 
                class="search-input"
                v-model="filterBy.txt" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="search"/>

        </div>
                
                
                <input type="radio" value="all"  v-model="filterBy.isRead" @input="onSetFilterBy"/>All
                <input type="radio" value="true"  v-model="filterBy.isRead" @input="onSetFilterBy"/>Read
                <input type="radio" value="false"  v-model="filterBy.isRead" @input="onSetFilterBy"/>Unread 
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

