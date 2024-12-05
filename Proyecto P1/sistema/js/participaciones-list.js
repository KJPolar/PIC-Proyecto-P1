class ParticipacionesList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.apiUrl = this.getAttribute("api-url");
      this.render();
      this.loadParticipaciones();
    }
  
    loadParticipaciones() {
      fetch(this.apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const participacionesList = data
            .map(
              (participacion) => `
                <li>
                  <p><strong>Empleado:</strong> ${participacion.nombre_empleado}</p>
                  <p><strong>Proyecto:</strong> ${participacion.nombre_proyecto}</p>
                  <p><strong>Rol:</strong> ${participacion.rol}</p>
                </li>
              `
            )
            .join("");
          this.shadowRoot.querySelector("#participaciones").innerHTML = participacionesList;
        })
        .catch(() => alert("Error al cargar las participaciones"));
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Agrega los estilos necesarios aquí */
        </style>
        <h2>Lista de Participaciones</h2>
        <ul id="participaciones"></ul>
      `;
    }
  }
  
  customElements.define("participaciones-list", ParticipacionesList);
  