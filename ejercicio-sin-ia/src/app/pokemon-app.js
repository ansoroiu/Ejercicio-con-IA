import {LitElement, html, css} from 'lit';
import '../components/pokemon-detail.js';
import '../components/pokemon-list.js';

class PokemonApp extends LitElement {
    static properties = {
        route: {type: String}
    };

    constructor() {
        super();
        this.route = window.location.hash || '#/';
        window.addEventListener('hashchange', ()=>{
            this.route = window.location.hash;
        });
    }

    render(){
        if (this.route.startsWith('#/pokemon/')){
            const id = this.route.split('/')[2];
            return html`
                <pokemon-detail .pokemonId=${id}></pokemon-detail>
            `;
        }

        return html `
            <pokemon-list></pokemon-list>
        `;
    }
}

customElements.define('pokemon-app', PokemonApp);