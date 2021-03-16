class Header extends HTMLElement
{
    constructor()
    {
        super();

        this.app = new App();
        
        return;
    }

    connectedCallback()
    {        
        this.attachShadow(
            {
                mode: 'open'
            }
        );

        this.shadowRoot.innerHTML += 
        `
            <style>
                :host 
                {
                    height: 8vh;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    background: #000000;
                    font-family: 'Roboto', sans-serif;
                    box-sizing: border-box;
                    border-bottom: 2px #63C866 solid;
                }

                #logo
                {
                    color: #EEEEEE;
                    font-size: 20px;
                    letter-spacing: 2px;
                }
                

                #links .link
                {
                    color: #EEEEEE;
                    text-decoration: none;
                    letter-spacing: 2px;
                    transition: 0.3s ease-in;
                    padding-right: 10px;
                    padding-left: 10px;
                }
                
                #links .link:hover
                {
                    color: #63C866;
                }
            </style>
        `;

        this.shadowRoot.innerHTML += 
        `
            <h4 id="logo">
                BeanStock
            </h4>

            <div id="links">
                <a class="link" href="/">
                    Home
                </a>

                <a class="link" href="/product">
                    Product
                </a>

                <a class="link" href="/about">
                    About
                </a>

                <a class="link" id="register" href="/login">
                    Login
                </a>

                <a class="link" id="register" href="/register">
                    Sign Up
                </a>
            </div>
        `;

        this.links = this.shadowRoot.querySelectorAll('#links .link');

        for(
            const link of [... this.links]
        ) link.addEventListener(
            'click',
            event => {
                event.preventDefault();
                this.app.router.render(link.attributes.href.value);

                return;
            }
        );
        
        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-header', Header);
export default Header;