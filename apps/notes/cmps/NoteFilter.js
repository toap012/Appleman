export default{
    template: `
    <section class="note-filter">
        <input 
            v-model="filterBy.txt" 
            type="text" 
            placeholder="search by text">

    </section>
`,
data() {
    return {
        filterBy: {
            txt: '',
            type: '',
        }
    }
},
watch: {
    filterBy: {
        handler() {
            this.$emit('filter', this.filterBy)
        },
        deep: true,
    }
}
}