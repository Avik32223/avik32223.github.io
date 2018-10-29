import BaseController from "./BaseController";
import anime, { timeline } from "animejs";

export default class IntroController extends BaseController {
  constructor() {
    super();
    this.page = document.querySelector("header.intro");
  }

  handlePageEnter({ fromPage, toPage }) {
    if (toPage === 0) {
      return anime({
        targets: this.page,
        translateY: "0%",
        easing: "easeInQuad",
        duration: 450,
      }).finished.then(() => {
        return true;
      });
    }
    return Promise.resolve(false);
  }
  handlePageExit({ fromPage, toPage }) {
    if (fromPage === 0 && toPage > 0) {
      const translateY = fromPage < toPage ? "-100%" : "100%";
      return anime({
        targets: this.page,
        translateY: translateY,
        easing: "easeInQuad",
        duration: 450,
      }).finished.then(() => {
        return true;
      });
    }
    return Promise.resolve(false);
  }

  handlesPageEnter({ toPage }) {
    if (toPage === 0) {
      return true;
    }
    return false;
  }

  handlesPageExit({ fromPage, toPage }) {
    if (fromPage === 0 && toPage > 0) {
      return true;
    }
    return false;
  }
}
