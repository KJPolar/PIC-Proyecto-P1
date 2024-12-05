class ProyectosList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.apiUrl = this.getAttribute("api-url");
    this.render();
    this.loadProyectos();

    this.shadowRoot
      .querySelector("#create-project")
      .addEventListener("click", () => {
        const form = document.createElement("proyectos-form");
        document.getElementById("main-content").appendChild(form);
      });
  }

  loadProyectos() {
    fetch(this.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const proyectosList = data
          .map(
            (proyecto) => `
            <li>
              <h4>${proyecto.nombre_proyecto}</h4>
              <p>${proyecto.fecha_inicio} - ${proyecto.fecha_fin}</p>
              <button class="edit-project" data-id="${proyecto.id_proyecto}">Editar</button>
              <button class="delete-project" data-id="${proyecto.id_proyecto}">Eliminar</button>
            </li>
          `
          )
          .join("");
        this.shadowRoot.querySelector("#proyectos").innerHTML = proyectosList;

        this.shadowRoot.querySelectorAll(".edit-project").forEach((button) => {
          button.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const form = document.createElement("proyectos-form");
            form.setAttribute("project-id", id);
            document.getElementById("main-content").appendChild(form);
          });
        });

        this.shadowRoot
          .querySelectorAll(".delete-project")
          .forEach((button) => {
            button.addEventListener("click", (e) => {
              const id = e.target.getAttribute("data-id");
              fetch(`http://localhost:8000/proyectos/${id}`, {
                method: "DELETE",
              })
                .then((response) => {
                  if (response.ok) {
                    alert("Proyecto eliminado");
                    this.loadProyectos(); // Recargar la lista
                  } else {
                    alert("Error al eliminar el proyecto");
                  }
                })
                .catch(() => alert("Error al eliminar el proyecto"));
            });
          });
      })
      .catch(() => alert("Error al cargar los proyectos"));
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          /* Estilos para el componente */
        </style>
        <h2>Lista de Proyectos</h2>
        <button id="create-project">Crear Nuevo Proyecto</button>
        <ul id="proyectos"></ul>
      `;
  }
}

customElements.define("proyectos-list", ProyectosList);
