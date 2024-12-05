class Footer extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `
              <style>
                  footer {
                      background-color: #333;
                      color: white;
                      text-align: center;
                      padding: 1rem;
                      font-size: 0.9rem;
                  }
              </style>
              <footer>
                  &copy; 2024 Programacion Interactiva de Componentes. Todos los derechos reservados.
              </footer>
          `;
    }
  }
  customElements.define("custom-footer", Footer);
  