export default {
	template: `
        <header class="app-header">
            <h1>Appleman</h1>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/mail">Gmail</router-link> |
                <router-link to="/notes">Notes</router-link>
            </nav>
        </header>
    `,
}
