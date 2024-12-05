class Header extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                header { 
                    background-color: #6200ea; 
                    color: white; 
                    padding: 1rem; 
                    text-align: center; 
                    font-size: 1.5rem; 
                }
            </style>
            <header>
                <slot name="title">Título predeterminado</slot>
            </header>
        `;
    }
}
customElements.define('custom-header', Header);
