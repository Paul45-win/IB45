class Loader extends HTMLElement
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
                    display: flex;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    align-items: center;
                    justify-content: center;
                    background: #000000;
                    width: 100%;
                    height: 100%;
                    z-index: 999;
                    visibility: hidden;
                }

                #loader
                {
                    border: 16px solid #f3f3f3;
                    border-top: 16px solid #63C866;
                    border-radius: 50%;
                    width: 120px;
                    height: 120px;
                    animation: spin 2s linear infinite;
                }

                @keyframes spin 
                {
                    0%
                    {
                        transform: rotate(0deg);
                    }
                    100%
                    {
                        transform: rotate(360deg); 
                    }
                }
            </style>
        `;

        this.shadowRoot.innerHTML +=
        `
            <div id="loader"></div>
        `;

        return;
    }

    disconnectedCallback()
    {
        return;
    }

    start()
    {
        this.style.visibility = 'visible';
        return;
    }

    stop()
    {
        this.style.visibility = 'hidden';
        return;
    }
}

customElements.define(
    'bs-loader',
    Loader
);

class Messages extends HTMLElement
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
                    position: fixed;
                    right: 0px;
                    width: 200px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .message
                {
                    margin-top: 10px;
                    animation: translation 1s forwards;
                }

                .error
                {
                    background: red;
                }

                .notice
                {

                }
        
                @keyframes translation 
                {
                    0%
                    {
                        transform: translateY(110px);
                    }
                    100%
                    {
                        transform: translateY(0); 
                    }
                }
            </style>
        `;

        this.shadowRoot.innerHTML +=
        `
        `;

        this.current = [];
        this.queued = [];

        return;
    }

    disconnectedCallback()
    {
        return;
    }

    push(
        message
    )
    {
        const
        {
            text,
            type = 'error',
            duration = 5000
        } = message;

        if(this.shadowRoot.children.length >= 4)
        {
            this.queued.push(message);
            return;
        }

        const div = document.createElement('div');

        div.classList.add('message');
        div.classList.add(type);

        this.shadowRoot.appendChild(div);

        const button = document.createElement('button');

        div.appendChild(button);

        const p = document.createElement('p');
        p.innerHTML = text;

        div.appendChild(p);

        const record = {};
        record.element = div;
        record.button = button;
        record.handler = () => this.remove(record);

        button.addEventListener(
            'click',
            record.handler
        );

        if(duration !== Infinity) record.timeout = setTimeout(
            record.handler,
            duration
        );

        this.current.push(record);

        return;
    }

    remove(
        record
    )
    {
        const index = this.current.indexOf(record);

        record.element.remove();

        record.button.removeEventListener(
            'click',
            record.handler
        );

        clearTimeout(record.timeout);

        this.current.splice(
            index,
            1
        );

        return;
    }
}

customElements.define(
    'bs-messages',
    Messages
);

class Router extends HTMLElement
{
    constructor(
        views
    )
    {
        super();

        this.app = new App();

        this.views = views;

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
                    margin: -8px;
                    overflow-x: hidden;
                    
                }
            </style>
        `;

        this.shadowRoot.innerHTML +=
        `
            <div id="display"></div>
        `;

        this.display = this.shadowRoot.querySelector('#display');

        // Listen for history updates
        window.addEventListener(
            'popstate',
            () => this.render(location.pathname)
        );

        // Initial routing
        this.render(location.pathname);

        return;
    }

    disconnectedCallback()
    {
        return;
    }

    async render(
        path
    )
    {
        // Start loading animation
        this.app.loader.start();

        // Change URL
        if(path !== location.pathname)
        {
            history.pushState(
                null,
                null,
                path
            );  
        }

        // Find the view
        const view = this.views.find(
            view => view.path.test(path)
        );
        
        // Update the title
        document.title = view.title || 'No Title';
        
        // Find unique components of the view and load
        const uniques = [
            ... new Set(view.elements)
        ];

        await Promise.all(
            uniques.map(
                unique => import(`/elements/${unique}.js`)
            )
        );

        // Push message if fails

        // Remove elements that do not appear in view
        const query = uniques.join(', ');
        const redundant = this.display.querySelectorAll(`:not(${query})`);

        for(const element of redundant) element.remove();

        for(
            const [
                index,
                element
            ] of view.elements.entries()
        )
        {
            const creator = customElements.get(element);
            const current = this.elements[index];

            // If body contains correct element at current index
            if(current instanceof creator) continue;

            // If body is smaller than view
            if(current === undefined)
            {
                this.display.appendChild(
                    document.createElement(element)
                );

                continue;
            }

            // Does the element appear later in body?
            const later = this.elements
                .slice(index)
                .find(
                    element => element instanceof creator
                );

            if(!later)
            {
                // If it does not, push the element at this position
                current.before(
                    document.createElement(element)
                );
            }
            else
            {
                // Otherwise pull it by deleting redundant
                const laterIndex = this.elements.indexOf(later);
                const redundant = this.children.slice(index, laterIndex);
                for(const element of redundant) element.remove();
            }
        }

        // Collect and remove elements that were pushed out
        const overflow = this.elements.slice(view.elements.length);
        for(const element of overflow) element.remove();

        this.app.loader.stop();
        this.current = view;

        return;
    }

    get elements()
    {
        return [... this.display.children]
    }
}

customElements.define(
    'bs-router',
    Router
);

class App
{
    constructor(
        settings
    )
    {
        if(App.instance) return App.instance;
        App.instance = this;

        const
        {
            views
        } = settings;
        
        this.loader = new Loader();
        this.messages = new Messages();
        this.router = new Router(views);

        document.body.appendChild(this.loader);
        document.body.appendChild(this.messages);
        document.body.appendChild(this.router);

        return;
    }
}

const app = new App(
    {
        views:
        [
            {
                name: 'index',
                path: /^\/$/,
                title: 'BeanStock | Home',
                elements:
                [
                    'bs-header',
                    'bs-index',
                ]
            },
            {
                name: 'about',
                path: /^\/about$/,
                title: 'BeanStock | About',
                elements:
                [
                    'bs-header',
                    'bs-about',
                ]
            },
            {
                name: 'register',
                path: /^\/register$/,
                title: 'BeanStock | Register',
                elements: 
                [
                    'bs-header',
                    'bs-register',
                ]
            },
            {
                name: 'login',
                path: /^\/login$/,
                title: 'BeanStock | Login',
                elements: 
                [
                    'bs-header',
                    'bs-login',
                ]
            },
            {
                name: 'not-found',
                path: /(.*?)/,
                title: 'BeanStock | 404 Not Found',
                elements:
                [
                    'bs-header',
                    'bs-not-found'
                ]
            }
        ]
    }
);