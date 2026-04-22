import { LitElement, html, css } from 'lit';
import './solicitudes-form.js';
import './solicitudes-list.js';
import { supabase } from './supabase-client.js';

class SolicitudesApp extends LitElement {

  static properties = {
    solicitudes: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f4f6f9;
      padding: 40px 20px;
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 40px;
      color: #1f2937;
    }
  `;

  constructor() {
    super();
    this.solicitudes = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.cargarSolicitudes();
  }

  // ✅ Carga solicitudes ordenadas por fecha descendente
  async cargarSolicitudes() {
    const { data, error } = await supabase
      .from('solicitudes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      this.solicitudes = data;
    }
  }

  // ✅ Se ejecuta cuando el formulario inserta correctamente
  handleSolicitudCreada() {
    this.cargarSolicitudes();
  }

  render() {
    return html`
      <div class="container">
        <h1>Gestión de Solicitudes</h1>

        <solicitud-form
          @solicitud-creada=${this.handleSolicitudCreada}
        ></solicitud-form>

        <solicitudes-list
          .solicitudes=${this.solicitudes}
        ></solicitudes-list>
      </div>
    `;
  }
}

customElements.define('solicitudes-app', SolicitudesApp);