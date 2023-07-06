export default {
    template: `
        <header class="app-header">
            <div class="logo">Appleman</div>
            <div class="nav-container">
                <div><span class="material-symbols-outlined">apps</span></div>
                <nav>
                    <router-link to="/" title="Home"><span class="material-symbols-outlined">home</span></router-link>
                    <router-link to="/about" title="About"><span class="material-symbols-outlined">groups</span></router-link>
                    <router-link to="/mail/inbox" title="Mail"><span class="material-symbols-outlined">mail</span></router-link>
                    <router-link to="/notes" title="Notes"><span class="material-symbols-outlined">tv_options_edit_channels</span></router-link>
                </nav>
            </div>
        </header>
    `,

}
