class EmpleadosForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
      this.form = this.shadowRoot.querySelector("form");
      this.employeeId = this.getAttribute("employee-id");
  
      if (this.employeeId) {
        this.loadEmployeeData(this.employeeId);
      }
  
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveEmployee();
      });
    }
  
    loadEmployeeData(id) {
      fetch(`http://localhost:8000/empleados/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.shadowRoot.querySelector("#name").value = data.nombre;
          this.shadowRoot.querySelector("#puesto").value = data.puesto;
          this.shadowRoot.querySelector("#salario").value = data.salario;
        })
        .catch(() => alert("Error al cargar los datos del empleado"));
    }
  
    saveEmployee() {
      const newEmployee = {
        nombre: this.shadowRoot.querySelector("#name").value,
        puesto: this.shadowRoot.querySelector("#puesto").value,
        salario: this.shadowRoot.querySelector("#salario").value,
      };
  
      const url = this.employeeId
        ? `http://localhost:8000/empleados/${this.employeeId}` 
        : `http://localhost:8000/empleados/`;
  
      const method = this.employeeId ? "PUT" : "POST";
  
      fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      })
        .then((response) => {
          if (response.ok) {
            alert("Empleado guardado correctamente.");
          } else {
            alert("Error al guardar el empleado.");
          }
        })
        .catch(() => alert("Error al guardar el empleado"));
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          form {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
  
          h3 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
          }
  
          label {
            display: block;
            font-size: 1rem;
            color: #333;
            margin-bottom: 10px;
          }
  
          input[type="text"],
          input[type="number"] {
            width: 100%;
            padding: 8px;
            margin: 5px 0 20px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
          }
  
          button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
          }
  
          button:hover {
            background-color: #45a049;
          }
        </style>
  
        <h3>${this.employeeId ? "Editar Empleado" : "Crear Nuevo Empleado"}</h3>
        <form>
          <label for="name">Nombre:</label>
          <input type="text" id="name" required>
  
          <label for="puesto">Puesto:</label>
          <input type="text" id="puesto" required>
  
          <label for="salario">Salario:</label>
          <input type="number" id="salario" required>
  
          <button type="submit">${this.employeeId ? "Guardar Cambios" : "Crear Empleado"}</button>
        </form>
      `;
    }
  }
  
  customElements.define("empleados-form", EmpleadosForm);
  