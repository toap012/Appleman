export default {
    name: 'mail-folders-filter',
    template: `
        <div class="folder-menu material-symbols-outlined" @click="toggleMenu">menu</div>
        <section class="mail-folders-filter hide" :class="isShown" @click="toggleMenu">
            <div @click="newMail" class="folder-btn new-mail-btn">
                <span class="material-symbols-outlined">edit</span>
                <span>Compose</span>
            </div>

            <div @click="onSetFilterBy('inbox')" class="folder-btn">
                <span class="material-symbols-outlined">inbox</span>
                <span>Inbox</span>
            </div>
            <div @click="onSetFilterBy('sent')" class="folder-btn">
                <span class="material-symbols-outlined">send</span>
                <span>Sent</span>
            </div>
            <div @click="onSetFilterBy('trash')" class="folder-btn">
                <span class="material-symbols-outlined">restore_from_trash</span>
                <span>Trash</span>
            </div>
            <div @click="onSetFilterBy('draft')" class="folder-btn">
                <span class="material-symbols-outlined">draft</span>
                <span>Draft</span>
            </div>
            <div @click="onSetFilterBy('stars')" class="folder-btn">
                <span class="material-symbols-outlined">star</span>
                <span>Stars</span>
            </div>
            <div @click="onSetFilterBy('#')" class="folder-btn">
                <span class="material-symbols-outlined">mail</span>
                <span>Mails</span>
            </div>
           
        </section>
    `,
    data() {
        return {
            filterBy: {
                folder: '#'
            },
            isShown: ''
        }
    },
    methods: {
        onSetFilterBy(folder) {
            this.filterBy.folder = folder
            this.$emit('filterByFolder', { ...this.filterBy })
            // setTimeout(() => {
            // }, 300)
        },
        newMail() {
            this.$emit('newMail')

        },
        toggleMenu() {
            this.isShown = this.isShown ? '' : 'show-folders'

        }
    }
}

