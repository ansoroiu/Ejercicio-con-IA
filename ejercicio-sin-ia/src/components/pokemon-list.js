import { LitElement, html, css } from 'lit';

class PokemonList extends LitElement{
    static properties = {
        pokemons: {type: Array},
        loading: {type: Boolean},
        error: {type: Boolean},
        pagina: {type: Number},
    };

    constructor(){
        super();
        this.pokemons = [];
        this.loading = false;
        this.error = false;
        this.pagina = 1;
    }

    connectedCallback(){
        super.connectedCallback();
        this.cargarPokemons();
    }

    async cargarPokemons(){
        this.loading = true;
        this.error = false;

        const limit = 10,
              offset = (this.pagina -1) * limit;

        try{
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`),
                  data = await res.json();

            this.pokemons = data.results;
        } catch(e){
            this.error = true;
        } finally {
            this.loading = false;
        }
    }

    verDetalles(item){
        const id = (this.page - 1) * 10 + item + 1;
        window.location.hash = `#/pokemon/${id}`;
    }

    render(){
        if(this.loading){
            return html`
                <p>Cargando...</p>
            `;
        }

        if(this.error){
            return html`
                <p>Ha salido algo mal, vuelva a intentarlo</p>
                <button @click=${this.cargarPokemons}>Reintentar</button>
            `;
        }

        if(this.pokemons.length === 0){
            return html`
                <p>Aún no existen datos</p>
            `;
        }

        return html`
                <div>
                    ${this.pokemons.map((p,i) => html`
                            <div @click=${()=>{
                                this.verDetalles(i)}
                            }>
                                <img src="">
                                <p>#${(this.page - 1) * 10 + i + 1}</p>
                            </div>
                        `)};
                </div>

                <button ?disabled=${this.page === 1} @click=${()=>
                    {this.page--; this.cargarPokemons();}}>Anterior</button>

                <button @clicks=${()=> {this.page++; this.cargarPokemons()}}> Siguiente</button>
            `;
    }
}

customElements.define('pokemon-list', PokemonList);
