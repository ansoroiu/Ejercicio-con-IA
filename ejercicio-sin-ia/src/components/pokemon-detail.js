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

    updated(cambios){
        if(cambios){
            this.cargarPokemon();
        }
    }

    async cargarPokemon(){
        this.loading = true;
        this.error = false;

        
    }
}