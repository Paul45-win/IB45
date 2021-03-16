class Index extends HTMLElement
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
                    display: block;
                    padding: 0;
                    height: 92vh;
                    background: #000000;
                }

                #mission 
                {
                    position: fixed;
                    top: 50%;
                    height: 50px;
                    color: #eeeeee;
                    font-family: 'Cutive Mono', monospace;
                    font-weight: 100;
                    text-align: center;
                    transform: rotate(-90deg);
                    z-index: 1;
                    animation: fadeIn 0.75s ease-in;
                }

                #container
                {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                #chart-line
                {
                    width: 100%;
                    height: 100%;
                    background: url("./img/chart-line.png") no-repeat;
                    background-size: 100% 100%;
                }

                #cover
                {
                    width: 100%;
                    height: 100%;
                    background: #000000;
                    position: absolute;
                    top: 0;
                    animation: transitionIn 3s forwards;
                }

                @keyframes transitionIn
                {
                    0% 
                    {
                        transform: translateX(0%);
                    }
                    100%
                    {
                        transform: translateX(100%);
                        display: none;
                    }
                }

                @keyframes fadeIn
                {
                    0% 
                    {
                        opacity: 0;
                    }
                    100%
                    {
                        opacity: 1;
                    }
                }
                
            </style>    
        `;
        
        this.shadowRoot.innerHTML +=
        `    
            <h2 id="mission">reach your <span style="color: #63C866">financial <br>altitude</span> with us</h2> 
            <div id="container">
                <div id="chart-line"></div>
                <div id="cover"></div>
            </div>
        `;

        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-index', Index);
export default Index;