import { LitElement, html, css } from 'lit';

class PokemonList extends LitElement {
  static properties = {
    pokemons: { type: Array },
    loading: { type: Boolean },
    error: { type: Boolean },
    pagina: { type: Number },
  };

  constructor() {
    super();
    this.pokemons = [];
    this.loading = false;
    this.error = false;
    this.pagina = 1;
  }

  static styles = css`
    :host {
      display: block;
      padding: 1.5rem;
      font-family: system-ui, Arial, sans-serif;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .card {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: center;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    img {
      width: 96px;
      height: 96px;
      object-fit: contain;
    }

    p {
      margin: 0.5rem 0 0;
      text-transform: capitalize;
      font-size: 0.95rem;
      color: #333;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      background: #f5f5f5;
      cursor: pointer;
      font-size: 0.9rem;
    }

    button:hover:not(:disabled) {
      background: #eaeaea;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .message {
      text-align: center;
      margin-top: 2rem;
      color: #666;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.cargarPokemons();
  }

  async cargarPokemons() {
    this.loading = true;
    this.error = false;

    const limit = 10;
    const offset = (this.pagina - 1) * limit;

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();
      this.pokemons = data.results;
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  verDetalles(index) {
    const id = (this.pagina - 1) * 10 + index + 1;
    window.location.hash = `#/pokemon/${id}`;
  }

  render() {
    if (this.loading) {
  return html`<p class="message">Cargando...</p>`;
}

if (this.error) {
  return html`
    <p class="message">Ha salido algo mal</p>
    <button @click=${this.cargarPokemons}>Reintentar</button>
  `;
}

return html`
  <div class="grid">
    ${this.pokemons.map((p, i) => {
      const id = (this.pagina - 1) * 10 + i + 1;
      return html`
        <div class="card" @click=${() => this.verDetalles(i)}>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
            alt="${p.name}"
          />
          <p>#${id} ${p.name}</p>
        </div>
      `;
    })}
  </div>

  <div class="actions">
    <button
      ?disabled=${this.pagina === 1}
      @click=${() => {
        this.pagina--;
        this.cargarPokemons();
      }}
    >
      Anterior
    </button>

    <button
      @click=${() => {
        this.pagina++;
        this.cargarPokemons();
      }}
    >
      Siguiente
    </button>
  </div>
`;
  }
}

customElements.define('pokemon-list', PokemonList);