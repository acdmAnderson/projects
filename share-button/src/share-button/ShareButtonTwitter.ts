
import EventHandler from "../event-handler/interfaces/EventHandler";
import AbstractLinkShareButton from "./base/AbstractLinkShareButton";

export default class ShareButtonTwitter extends AbstractLinkShareButton {
    
    constructor(url: string, clazz: string, eventHandler: EventHandler) {
        super(url, clazz, eventHandler);
    }

    createLink(): string {
        return `https://twitter.com/share?url=${this.url}`;
    }
}