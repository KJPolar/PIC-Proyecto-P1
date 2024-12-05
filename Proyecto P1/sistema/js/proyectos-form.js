class ProyectosForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      if (this.hasAttribute('project-id')) {
        this.loadProjectData(this.getAttribute('project-id'));
      }
  
      this.shadowRoot.querySelector('#save-project').addEventListener('click', this.saveProject.bind(this));
    }

    loadProjectData(projectId) {
      fetch(`http://localhost:8000/proyectos/${projectId}`)
        .then(response => response.json())
        .then(data => {
          this.shadowRoot.querySelector('#project-name').value = data.nombre_proyecto;
          this.shadowRoot.querySelector('#start-date').value = data.fecha_inicio;
          this.shadowRoot.querySelector('#end-date').value = data.fecha_fin;
        })
        .catch(error => alert('Error al cargar los datos del proyecto'));
    }
  
    saveProject() {
      const projectName = this.shadowRoot.querySelector('#project-name').value;
      const startDate = this.shadowRoot.querySelector('#start-date').value;
      const endDate = this.shadowRoot.querySelector('#end-date').value;
  
      const projectData = {
        nombre_proyecto: projectName,
        fecha_inicio: startDate,
        fecha_fin: endDate
      };
  
      const projectId = this.getAttribute('project-id');
      const method = projectId ? 'PUT' : 'POST';
      const url = projectId ? `http://localhost:8000/proyectos/${projectId}` : 'http://localhost:8000/proyectos/';
  
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      })
        .then(response => {
          if (response.ok) {
            alert(projectId ? 'Proyecto actualizado correctamente' : 'Proyecto creado correctamente');
          } else {
            alert('Error al guardar el proyecto');
          }
        })
        .catch(() => alert('Error al guardar el proyecto'));
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Estilos del formulario */
        </style>
        <h3>${this.hasAttribute('project-id') ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}</h3>
        <label>
          Nombre del Proyecto:
          <input type="text" id="project-name" required />
        </label>
        <label>
          Fecha de Inicio:
          <input type="date" id="start-date" required />
        </label>
        <label>
          Fecha de Fin:
          <input type="date" id="end-date" required />
        </label>
        <button type="button" id="save-project">${this.hasAttribute('project-id') ? 'Actualizar' : 'Crear'}</button>
      `;
    }
  }
  
  customElements.define('proyectos-form', ProyectosForm);
  