import { EventHub } from '../../../eventhub/EventHub.js';
import { Events } from '../../../eventhub/Events.js';
import { BaseComponent } from '../../BaseComponent/BaseComponent.js';


export class ProfileSettingsComponent extends BaseComponent {

    #container = null
    constructor() {
        super();
        this.loadCSS(); // could cause error here because may use parent method
    }

    //overrride 
    loadCSS(fileName) {
        if (this.cssLoaded) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        // Dynamically load CSS from the same directory as the JS file
        link.href = `./components/ProfileSettingsGroup/${fileName}/${fileName}.css`;
        document.head.appendChild(link);
        this.cssLoaded = true;
    }

    #createContainer() {
        this.#container = document.createElement('div')
        this.#container.classList.add('head_container')
    }


    #getTemplate() {
        return `
            
            
        
        `
    }




}