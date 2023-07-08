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
                
                
                <div>All<input type="radio" value="all"  v-model="filterBy.isRead" @input="onSetFilterBy"/></div>
                <div>Read<input type="radio" value="true"  v-model="filterBy.isRead" @input="onSetFilterBy"/></div>
                <div>Unread <input type="radio" value="false"  v-model="filterBy.isRead" @input="onSetFilterBy"/></div>
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

