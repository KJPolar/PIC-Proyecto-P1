class EmployeeList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      this.container = document.createElement("div");
  
      this.estilo = document.createElement("style");
      this.estilo.textContent = `
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                  font-size: 16px;
                  text-align: left;
              }
              th, td {
                  padding: 10px;
                  border: 1px solid #ccc;
              }
              th {
                  background-color: #f4f4f4;
              }
              .actions button {
                  margin: 0 5px;
                  padding: 5px 10px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
              }
              .btn-update {
                  background-color: #4caf50;
                  color: white;
              }
              .btn-delete {
                  background-color: #f44336;
                  color: white;
              }
              .error-alert {
                  color: red;
                  font-weight: bold;
              }
              .empty-alert {
                  color: gray;
                  font-style: italic;
              }
          `;
  
      this.shadowRoot.appendChild(this.estilo);
      this.shadowRoot.appendChild(this.container);
    }
  
    connectedCallback() {
      const apiUrl = this.getAttribute("api-url");
      this.fetchData(apiUrl);
    }
  
    fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const employees = data || [];
        this.render(employees);
      } catch (error) {
        console.error("Error con la API", error);
        this.container.innerHTML = `
                  <p class="error-alert">Error con la API</p>
              `;
      }
    };
  
    render = (employees) => {
      if (employees.length === 0) {
        this.container.innerHTML = `
                  <p class="empty-alert">No hay empleados disponibles</p>
              `;
        return;
      }
  
      let tableHTML = `
              <table>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Puesto</th>
                          <th>Salario</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
          `;
  
      // Generamos las filas con forEach
      employees.forEach((employee) => {
        tableHTML += `
                  <tr>
                      <td>${employee.id_empleado}</td>
                      <td>${employee.nombre}</td>
                      <td>${employee.puesto}</td>
                      <td>${employee.salario}</td>
                      <td class="actions">
                          <button class="btn-update" data-id="${employee.id_empleado}">Actualizar</button>
                          <button class="btn-delete" data-id="${employee.id_empleado}">Eliminar</button>
                      </td>
                  </tr>
              `;
      });
  
      tableHTML += `
                  </tbody>
              </table>
          `;
  
      this.container.innerHTML = tableHTML;
  
      this.container.querySelectorAll(".btn-delete").forEach((button) => {
        button.addEventListener("click", () =>
          this.handleDelete(button.dataset.id)
        );
      });
  
      this.container.querySelectorAll(".btn-update").forEach((button) => {
        button.addEventListener("click", () =>
          this.handleUpdate(button.dataset.id)
        );
      });
    };
  
    handleDelete = async (id) => {
      const confirmDelete = confirm(
        `¿Estás seguro de que deseas eliminar el empleado con ID: ${id}?`
      );
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost:8000/empleados/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            alert("Empleado eliminado con éxito");
            const apiUrl = this.getAttribute("api-url");
            this.fetchData(apiUrl); // Refrescamos la lista
          } else {
            alert("Error al eliminar el empleado");
          }
        } catch (error) {
          console.error("Error en la eliminación", error);
          alert("Error con la conexión de la API");
        }
      }
    };
  
    handleUpdate = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/empleados/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del empleado");
        }
        const employeeData = await response.json();
  
        const nuevoNombre = prompt("Nuevo nombre:", employeeData.nombre);
        const nuevoPuesto = prompt("Nuevo puesto:", employeeData.puesto);
        const nuevoSalario = prompt("Nuevo salario:", employeeData.salario);
  
        if (!nuevoNombre || !nuevoPuesto || !nuevoSalario) {
          alert("Actualización cancelada. Todos los campos son obligatorios.");
          return;
        }
  
        const updateResponse = await fetch(
          `http://localhost:8000/empleados/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: nuevoNombre.trim(),
              puesto: nuevoPuesto.trim(),
              salario: parseFloat(nuevoSalario),
            }),
          }
        );
  
        if (!updateResponse.ok) {
          throw new Error("Error al actualizar el empleado");
        }
  
        alert("Empleado actualizado con éxito");
  
        const apiUrl = this.getAttribute("api-url");
        this.fetchData(apiUrl);
      } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        alert(
          "No se pudo actualizar el empleado. Revisa la consola para más detalles."
        );
      }
    };
  }
  
  window.customElements.define("empleados-list", EmployeeList);
  