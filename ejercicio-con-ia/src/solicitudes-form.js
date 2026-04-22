import { LitElement, html, css } from 'lit';
import { supabase } from './supabase-client.js';

class SolicitudForm extends LitElement {

  static properties = {
    titulo: { state: true },
    descripcion: { state: true },
    categoria: { state: true },
    prioridad: { state: true },
    email: { state: true },
    enviando: { state: true },
    errorMsg: { state: true },
    successMsg: { state: true }
  };

  static styles = css`
    .card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    h2 {
      margin-bottom: 20px;
      color: #111827;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    input, textarea {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      font-size: 14px;
      transition: 0.2s;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    button {
      padding: 12px;
      border-radius: 8px;
      border: none;
      background: #2563eb;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s;
    }

    button:hover:not(:disabled) {
      background: #1e40af;
    }

    button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }

    .error {
      color: #dc2626;
      font-size: 0.9rem;
    }

    .success {
      color: #16a34a;
      font-size: 0.9rem;
    }
  `;

  constructor() {
    super();
    this.titulo = '';
    this.descripcion = '';
    this.categoria = '';
    this.prioridad = 1;
    this.email = '';
    this.enviando = false;
    this.errorMsg = '';
    this.successMsg = '';
  }

  // ✅ Validación general del formulario
  get formularioValido() {
    return (
      this.titulo.length >= 5 &&
      this.titulo.length <= 60 &&
      this.descripcion.length >= 20 &&
      this.descripcion.length <= 500 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) &&
      this.prioridad >= 1 &&
      this.prioridad <= 5 &&
      this.categoria.trim() !== ''
    );
  }

  async enviarFormulario(e) {
    e.preventDefault();

    if (!this.formularioValido || this.enviando) return;

    this.enviando = true;
    this.errorMsg = '';
    this.successMsg = '';

    const { error } = await supabase
      .from('solicitudes')
      .insert({
        titulo: this.titulo,
        descripcion: this.descripcion,
        categoria: this.categoria,
        prioridad: this.prioridad,
        email: this.email
      });

    this.enviando = false;

    if (error) {
      this.errorMsg = 'Error al enviar. Puedes reintentar.';
      return;
    }

    this.successMsg = 'Solicitud enviada correctamente ✅';
   
    // ✅ Ocultar después de 3 segundos
    setTimeout(() => {
      this.successMsg = '';
    }, 3000);
   
    this.resetFormulario();  

    // ✅ Avisamos al componente padre
    this.dispatchEvent(new CustomEvent('solicitud-creada', {
      bubbles: true,
      composed: true
    }));
  }

  resetFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.categoria = '';
    this.prioridad = 1;
    this.email = '';
  }

  render() {
    return html`
      <div class="card">
        <h2>Nueva Solicitud</h2>

        <form @submit=${this.enviarFormulario}>

          <input
            placeholder="Título (5-60 caracteres)"
            .value=${this.titulo}
            @input=${e => this.titulo = e.target.value}
          />

          <textarea
            placeholder="Descripción (20-500 caracteres)"
            .value=${this.descripcion}
            @input=${e => this.descripcion = e.target.value}
          ></textarea>

          <input
            placeholder="Categoría"
            .value=${this.categoria}
            @input=${e => this.categoria = e.target.value}
          />

          <input
            type="number"
            min="1"
            max="5"
            placeholder="Prioridad (1-5)"
            .value=${this.prioridad}
            @input=${e => this.prioridad = Number(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            .value=${this.email}
            @input=${e => this.email = e.target.value}
          />

          <button
            type="submit"
            ?disabled=${!this.formularioValido || this.enviando}
          >
            ${this.enviando ? 'Enviando...' : 'Enviar'}
          </button>

          ${this.errorMsg 
            ? html`<div class="error">${this.errorMsg}</div>` 
            : ''}

          ${this.successMsg 
            ? html`<div class="success">${this.successMsg}</div>` 
            : ''}

        </form>
      </div>
    `;
  }
}

customElements.define('solicitud-form', SolicitudForm);