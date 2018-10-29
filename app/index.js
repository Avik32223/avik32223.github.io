/**
 * Application entry point
 */

// Load application styles
import "styles/index.scss";
import MenuController from "./controllers/MenuController";
import ScrollManager from "./ScrollManager";
import IntroController from "./controllers/pages/IntroController";
import ShowcaseController from "./controllers/pages/ShowcaseController";
import ResumeController from "./controllers/pages/ResumeController";
import SocialController from "./controllers/pages/SocialController";

const introController = new IntroController();
const showcaseController = new ShowcaseController();
const resumeController = new ResumeController();
const socialController = new SocialController();

// ================================
// START YOUR APP HERE
// ================================
export default class App {
  constructor() {
    this.scrollManager = new ScrollManager();
    this.scrollManager.registerController(introController);
    this.scrollManager.registerController(showcaseController);
    this.scrollManager.registerController(resumeController);
    this.scrollManager.registerController(socialController);
    this.menuController = new MenuController();
    this.unregisterMenuControllerListener = this.menuController.addListener(
      () => {
        const isMenuOpen = this.menuController.isMenuOpen();
        this.scrollManager.isDisabled = isMenuOpen === true ? true : false;
      },
    );

    this.scrollManager.init();
    this.menuController.init();
  }

  unregister() {
    this.scrollManager.unRegisterScroll();
    this.unregisterMenuControllerListener();
  }
}
// const myApp = new App();
