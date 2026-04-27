import { LitElement, html, css } from "lit";

class PokemonDetail extends LitElement {
    static properties = {
        pokemonId: {type: Number},
        pokemon: {type: Object},
        loading: {type: Boolean},
        error: {type: Boolean},
    };

    constructor(){
        super();
        this.loading = false;
        this.error = false;
    }

    static styles = css`
    :host {
            display: block;
            padding: 2rem;
            font-family: system-ui, Arial, sans-serif;
        }

        .container {
            max-width: 400px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
        }

        h2 {
            margin: 0.5rem 0;
            text-transform: capitalize;
        }

        img {
            width: 150px;
            height: 150px;
            object-fit: contain;
        }

        .info {
            margin-top: 1rem;
            color: #444;
            font-size: 0.95rem;
        }

        .info p {
            margin: 0.25rem 0;
        }

        button {
            margin-bottom: 1rem;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            border: 1px solid #ccc;
            background: #f5f5f5;
            cursor: pointer;
        }

        button:hover {
            background: #eaeaea;
        }

        .message {
            text-align: center;
            color: #666;
        }
    `;
    
    updated(changedProps) {
        if (changedProps.has('pokemonId')) {
            this.cargarPokemon();
        }
    }

    async cargarPokemon(){
        this.loading = true;
        this.error = false;

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`);
            if(!res.ok) throw new Error();

            this.pokemon = await res.json();
        } catch (e){
            this.error = true;
        } finally {
            this.loading = false;
        }
    }

    render(){
        if (this.loading) {
  return html`<p class="message">Cargando...</p>`;
}

if (this.error) {
  return html`
    <p class="message">Error al cargar</p>
    <button @click=${this.cargarPokemon}>Reintentar</button>
  `;
}

if (this.pokemon) {
  return html`
    <div class="container">
        <button @click=${() => (window.location.hash = '#/')}>Volver</button>

        <h2>${this.pokemon.name}</h2>
        <p>#${this.pokemon.id}</p>

        <img
            src="${this.pokemon.sprites.front_default}"
            alt="${this.pokemon.name}"
        />

        <div class="info">
            <p>
            Tipos:
            ${this.pokemon.types.map(t => t.type.name).join(', ')}
            </p>
            <p>Altura: ${this.pokemon.height}</p>
            <p>Peso: ${this.pokemon.weight}</p>
        </div>
        </div>
        `;
        }
    }
}

customElements.define('pokemon-detail', PokemonDetail);