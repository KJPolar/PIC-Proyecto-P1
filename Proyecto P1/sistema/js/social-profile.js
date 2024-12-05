class SocialProfile extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const defaultImage = 'https://thumbs.dreamstime.com/b/vector-de-usuario-redes-sociales-perfil-avatar-predeterminado-retrato-vectorial-del-176194876.jpg';

        shadow.innerHTML = `
            <style>
                .profile {
                    font-family: Arial, sans-serif;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    max-width: 400px;
                    margin: auto;
                    text-align: center;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                .profile img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    margin-bottom: 1rem;
                }
                .profile h2 {
                    margin: 0.5rem 0;
                    color: #333;
                }
                .profile p {
                    margin: 0.3rem 0;
                    color: #555;
                }
            </style>
            <div class="profile">
                <img src="${this.getAttribute('image') || defaultImage}" alt="Foto de perfil" />
                <h2>${this.getAttribute('name') || 'Ismael Amagua'}</h2>
                <p><strong>Correo:</strong> ${this.getAttribute('email') || 'ciamagua@espe.edu.ec'}</p>
            </div>
        `;
    }
}
customElements.define('social-profile', SocialProfile);
