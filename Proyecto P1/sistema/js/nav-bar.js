class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const navTemplate = document.createElement('template');
        navTemplate.innerHTML = `
            <style>
                nav {
                    background-color: #333;
                    color: white;
                    padding: 10px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
                a {
                    color: white;
                    text-decoration: none;
                    padding: 5px 15px;
                    border-radius: 5px;
                }
                a:hover {
                    background-color: #555;
                }
            </style>
            <nav>
                <a href="#" data-view="home">Inicio</a>
                <a href="#" data-view="employees">Empleados</a>
                <a href="#" data-view="projects">Proyectos</a>
                <a href="#" data-view="participations">Participaciones</a>
                <a href="#" data-view="about">Acerca de</a>
            </nav>
        `;
        this.shadowRoot.appendChild(navTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                this.dispatchEvent(new CustomEvent('navigate', {
                    detail: { view },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }
}

customElements.define('nav-bar', NavBar);
