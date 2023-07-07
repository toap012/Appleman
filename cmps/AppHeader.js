export default {
    template: `
        <header class="app-header">
            <div class="nav-container">
                <div @click.prev="toogleMenu" class="material-symbols-outlined menu-btn">apps</div>
                <nav :class="hide">
                    <router-link to="/" title="Home"><span style="color:#4385F6" class="material-symbols-outlined">home</span></router-link>
                    <router-link to="/about" title="About"><span style="color:#FBBC05"  class="material-symbols-outlined">groups</span></router-link>
                    <router-link to="/mail/inbox" title="Mail"><span style="color:#EC4336"  class="material-symbols-outlined">mail</span></router-link>
                    <router-link to="/notes" title="Notes"><span style="color:#34A856" class="material-symbols-outlined">tv_options_edit_channels</span></router-link>
                </nav>
            </div>
            <router-link to="/" title="Home"><div class="logo"><span style="color:#4385F6">A</span><span style="color:#EC4336">p</span><span style="color:#EC4336">p</span><span style="color:#FBBC05">l</span><span style="color:#34A856">e</span><span style="color:#FBBC05">m</span><span style="color:#34A856">a</span><span style="color:#EC4336">n</span></div></router-link>
        </header>
    `,
    data() {
        return {
            hidden: true,
        }
    },
    methods: {
        toogleMenu() {
            this.hidden = !this.hidden
        }
    },
    computed: {
        hide() {
            return this.hidden ? 'hide' : ''
        }
    }

}