export default {
    template: `
        <header class="app-header">
            <h1>Appleman</h1>
            <div class="nav-container">
                <div><span class="material-symbols-outlined">apps</span></div>
                <nav>
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <router-link to="/mail">Mail</router-link>
                    <router-link to="/notes">Notes</router-link>
                </nav>
            </div>
        </header>
    `,
}
