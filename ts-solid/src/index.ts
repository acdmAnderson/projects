import ShareButtonFacebook from "./share-button/ShareButtonFacebook";
import DOMEventHandler from "./event-handler/DOMEventHandler";
import ShareButtonTwitter from "./share-button/ShareButtonTwitter";
import ShareButtonLinkedIn from "./share-button/ShareButtonLinkedIn";
import ShareButtonPrint from "./share-button/ShareButtonPrint";

const eventHandler = new DOMEventHandler();
const twitter = new ShareButtonTwitter("", ".btn-twitter", eventHandler);
twitter.bind();
const facebook = new ShareButtonFacebook("", ".btn-facebook", eventHandler);
facebook.bind();
const linkedin = new ShareButtonLinkedIn("", ".btn-linkedin", eventHandler);
linkedin.bind();
const print = new ShareButtonPrint(".btn-print", eventHandler);
print.bind();