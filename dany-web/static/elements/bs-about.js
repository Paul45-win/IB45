class About extends HTMLElement
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
                    height: 92vh;
                    background: #000000;
                    font-family: 'Helvetica', sans-serif;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                }

                #heading 
                {
                    margin: 0;
                    color: #eeeeee;
                    font-size: 50px;
                    font-weight: 300;
                    font-family: 'Roboto', sans-serif;
                }

                #members
                {
                    margin-top: 5%;
                    width: 100%;
                    height: 45%;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                }

                .member
                {
                    width: 20%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s ease-in;
                    background: #303036;
                    border: 2px solid #eeeeee;
                    border-radius: 10px;
                }

                .member:hover
                {
                    box-shadow: 1px 1px 5px 5px #c4c4c4;
                }

                .profile
                {
                    width: 50%;
                    height: 43%;
                    border: 1px solid #eeeeee;
                    border-radius: 50%;
                }



                #Nikolay-Profile
                {
                    background: url('../img/profiles/Nikolay.jpg') no-repeat center center;
                    background-size: 100% 100%;
                }

                #Yashasvi-Profile
                {
                    background: url('../img/profiles/Yashasvi.jpg') no-repeat center center;
                    background-size: 100% 100%;
                }

                #Dishika-Profile
                {
                    background: url('../img/profiles/Dishika.jpg') no-repeat center center;
                    background-size: 100% 100%;
                }

                #Anomitro-Profile
                {
                    background: url('../img/profiles/Anomitro.jpg') no-repeat center center;
                    background-size: 100% 100%;
                }

                #name
                {
                    color: #eeeeee;
                }

                #role
                {
                    transform: translateY(-160%);
                    color: #63C866;
                    font-size: 1em;
                }

                .social
                {
                    width: 100%;
                    height: 10%;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                }

                #insta
                {
                    height: 100%;
                    width: 12%;
                    background: url('../img/social-media/instagram.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                #linkedin
                {
                    height: 100%;
                    width: 12%;
                    background: url('../img/social-media/linkedin.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                #github
                {
                    height: 100%;
                    width: 12%;
                    background: url('../img/social-media/github.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                .icon
                {
                    opacity: 0.5;
                    transition: 0.2s ease-in;
                }

                .icon:hover
                {
                    opacity: 1;
                    transition: 0.2s ease-in;
                }

                
            </style>
        `;

        this.shadowRoot.innerHTML += 
        `
            <h1 id="heading">
                OUR TEAM
            </h1>
            
            <div id="members">
                <div class="member">
                    <div class="profile" id="Nikolay-Profile"></div>
                    <h3 id="name">Nikolay Tokarenko</h3>
                    <p id="role">Full Stack Developer</p>
                    <div class="social">
                        <div class="icon" id="insta"></div>
                        <div class="icon" id="linkedin"></div>
                        <div class="icon" id="github"></div>
                    </div>
                </div>
                <div class="member">
                    <div class="profile" id="Yashasvi-Profile"></div>
                    <h3 id="name">Yashasvi Jain</h3>
                    <p id="role">Developer</p>
                    <div class="social">
                        <div class="icon" id="insta"></div>
                        <div class="icon" id="linkedin"></div>
                        <div class="icon" id="github"></div>
                    </div>
                </div>
                <div class="member">
                    <div class="profile" id="Dishika-Profile"></div>
                    <h3 id="name">Dishika Goel</h3>
                    <p id="role">UI/UX Designer</p>
                    <div class="social">
                        <div class="icon" id="insta"></div>
                        <div class="icon" id="linkedin"></div>
                        <div class="icon" id="github"></div>
                    </div>
                </div>
                <div class="member">
                    <div class="profile" id="Anomitro-Profile"></div>
                    <h3 id="name">Anomitro Paul</h3>
                    <p id="role">Developer</p>
                    <div class="social">
                        <div class="icon" id="insta"></div>
                        <div class="icon" id="linkedin"></div>
                        <div class="icon" id="github"></div>
                    </div>
                </div>
            </div>
        `;
        
        return;
    }

    disconnectedCallback()
    {
        return;
    }
}

customElements.define('bs-about', About);
export default About;