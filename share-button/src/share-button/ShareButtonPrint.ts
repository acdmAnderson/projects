import EventHandler from "../event-handler/interfaces/EventHandler";
import AbstractShareButton from "./base/AbstractShareButton";

export default class ShareButtonTwitter extends AbstractShareButton {
    
    constructor(clazz: string, eventHandler: EventHandler) {
        super(eventHandler, clazz);
    }

    createAction(): any {
        return () => window.print();
    }
}