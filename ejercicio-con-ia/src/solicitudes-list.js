import { LitElement, html, css } from 'lit';

class SolicitudesList extends LitElement {

  static properties = {
    solicitudes: { type: Array }
  };

  static styles = css`
    h2 {
      margin-bottom: 20px;
      color: #111827;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.04);
      margin-bottom: 15px;
    }

    .titulo {
      font-weight: 600;
      font-size: 16px;
      color: #1f2937;
    }

    .meta {
      font-size: 13px;
      color: #6b7280;
      margin-top: 5px;
    }

    .prioridad {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 6px;
      background: #e0e7ff;
      font-size: 12px;
      margin-top: 8px;
    }
  `;

  constructor() {
    super();
    this.solicitudes = [];
  }

  render() {
    return html`
      <h2>Mis Solicitudes</h2>

      ${this.solicitudes.map(s => html`
        <div class="card">
          <div class="titulo">${s.titulo}</div>
          <div>${s.descripcion}</div>
          <div class="prioridad">Prioridad ${s.prioridad}</div>
          <div class="meta">
            ${s.categoria} · ${new Date(s.created_at).toLocaleString()}
          </div>
        </div>
      `)}
    `;
  }
}

customElements.define('solicitudes-list', SolicitudesList);