import AbstractShareButton from "./AbstractShareButton";
import EventHandler from "../../event-handler/interfaces/EventHandler";

export default abstract class AbstractLinkShareButton extends AbstractShareButton {
    url: string;

    constructor(url: string, clazz: string, eventHandler: EventHandler) {
        super(eventHandler, clazz);
        this.url = url;
    }

    abstract createLink(): string;

    createAction(): any {
        const link = this.createLink();
        return () => window.open(link);
    }
}