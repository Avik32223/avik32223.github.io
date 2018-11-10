import Menu from "./controllers/MenuController";

import $ from "jquery";
import jqueryMousewheel from "./lib/jquery-mousewheel";
jqueryMousewheel($);

import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

const DARK = "dark";
const LIGHT = "light";

export default class ScrollManager {
  constructor() {
    this.currentPage = 0;
    this.isAnimating = false;
    this.lastAnimationTime = null;
    this.controllers = [];
    this.unRegisterScroll = null;
    this.isDisabled = false;
  }

  init() {
    this.registerScroll();
  }

  registerController(controller) {
    this.controllers.push(controller);
  }

  registerScroll() {
    const throttledPageTransition = debounce(
      event => {
        console.log("fired");
        const { deltaY } = event;
        let nextPage = this.currentPage + (deltaY < 0 ? 1 : -1);
        if (nextPage == this.currentPage) {
          return null;
        }

        if (this.isAnimating || this.isDisabled) {
          return null;
        }

        const timeNow = window.performance.now();
        if (this.lastAnimationTime && timeNow - this.lastAnimationTime < 2500) {
          return null;
        }

        this.lastAnimationTime = timeNow;
        this.isAnimating = true;
        this.goToPage(nextPage);
      },
      500,
      {
        leading: true,
        trailing: false,
        maxWait: 1000,
      },
    );

    $("body").on("mousewheel", throttledPageTransition);
    this.unRegisterScroll = () => {
      $("body").off("mousewheel", throttledPageTransition);
    };
  }

  /**
   * handles page transition
   * @param {integer} page page instance number to go to
   */
  goToPage(page) {
    const entryControllers = this.controllers.filter(controller =>
      controller.handlesPageEnter({
        fromPage: this.currentPage,
        toPage: page,
      }),
    );

    const exitControllers = this.controllers.filter(controller =>
      controller.handlesPageExit({
        fromPage: this.currentPage,
        toPage: page,
      }),
    );

    const exitControllerPromises = exitControllers.reduce(
      (tillNow, controller) => [
        ...tillNow,
        controller.handlePageExit({
          fromPage: this.currentPage,
          toPage: page,
        }),
      ],
      [],
    );

    Promise.all([...exitControllerPromises]).then(exitResults => {
      const entryControllerPromises = entryControllers.reduce(
        (tillNow, controller) => [
          ...tillNow,
          controller.handlePageEnter({
            fromPage: this.currentPage,
            toPage: page,
          }),
        ],
        [],
      );

      Promise.all([...entryControllerPromises]).then(entryResults => {
        this.isAnimating = false;
        if (exitResults.some(e => e) && entryResults.some(e => e)) {
          console.log("page:" + page);
          this.currentPage = page;
          setTimeout(() => {
            this.lastAnimationTime = null;
          }, 1000);
        }
      });
    });
  }
}
