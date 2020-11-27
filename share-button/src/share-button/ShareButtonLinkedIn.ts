import EventHandler from "../event-handler/interfaces/EventHandler";
import AbstractLinkShareButton from "./base/AbstractLinkShareButton";


export default class ShareButtonLinkedIn extends AbstractLinkShareButton {
    
    constructor(url: string, clazz: string, eventHandler: EventHandler) {
        super(url, clazz, eventHandler);
    }
    createLink(): string {
        return `http://www.linkedin.com/shareArticle?url=${this.url}`;
    }
}