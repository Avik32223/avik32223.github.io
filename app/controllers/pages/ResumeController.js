import BaseController from "./BaseController";
import anime, { timeline } from "animejs";

export default class ResumeController extends BaseController {
  constructor() {
    super();
    this.page = document.querySelector(".resume");
  }

  handlePageEnter({ fromPage, toPage }) {
    if (toPage === 4) {
      return anime({
        targets: this.page,
        translateY: "0%",
        easing: "easeInQuad",
        duration: 0,
      }).finished.then(() => {
        return true;
      });
    }
    return Promise.resolve(false);
  }

  handlePageExit({ fromPage, toPage }) {
    const translateY = fromPage < toPage ? "-100%" : "100%";
    if (fromPage === 4) {
      return anime({
        targets: this.page,
        translateY: translateY,
        easing: "easeInQuad",
        duration: 0,
      }).finished.then(() => {
        return true;
      });
    }
    return Promise.resolve(false);
  }

  handlesPageEnter({ toPage }) {
    if (toPage === 4) {
      return true;
    }
    return false;
  }

  handlesPageExit({ fromPage, toPage }) {
    if (fromPage === 4) {
      return true;
    }
    return false;
  }
}
