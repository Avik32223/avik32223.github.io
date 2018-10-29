import anime, { timeline } from "animejs";
export default class MenuController {
  constructor() {
    this.listeners = [];
    this.menuBtn = document.querySelector(".burger");
    this.menuBtnLines = document.querySelectorAll(
      ".burger-line-wrap .burger-line-dark",
    );

    this.menuBtnCloseLines = document.querySelectorAll(
      ".burger-close-wrap .burger-close",
    );

    this.menuNavigation = document.querySelector(".burger-menu");
    this.menuNavigationSailLeft = document.querySelectorAll(
      ".burger-menu-sail-l",
    );
    this.menuNavigationSailRight = document.querySelectorAll(
      ".burger-menu-sail-r",
    );
    this.menuNavigationLinks = document.querySelectorAll(".burger-menu-link");
  }

  addListener(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  triggerListeners() {
    this.listeners.forEach(listener => {
      listener();
    });
  }

  init() {
    this.registerHandlers();
  }

  isMenuOpen() {
    return this.menuBtn.classList.contains("active");
  }

  handleMenuClick() {
    this.toggleMenuBtn();
    this.toggleMenuNavigation();
    this.triggerListeners();
  }

  toggleMenuBtn() {
    const isMenuOpen = this.isMenuOpen();
    const menuBtnTimeline = timeline({
      easing: "easeInQuint",
    });
    if (!isMenuOpen) {
      this.menuBtn.classList.add("active");
      menuBtnTimeline
        .add({
          targets: this.menuBtnLines,
          translateX: "100%",
          delay: function(el, i, l) {
            return i * 50;
          },
        })
        .add({
          targets: this.menuBtnCloseLines,
          translateY: "0%",
          offset: 400,
          delay: function(el, i, l) {
            return i * 100;
          },
        });
    } else {
      this.menuBtn.classList.remove("active");
      menuBtnTimeline
        .add({
          targets: this.menuBtnCloseLines,
          translateY: "108%",
          delay: function(el, i, l) {
            return i * 100;
          },
        })
        .add({
          targets: this.menuBtnLines,
          translateX: "0%",
          offset: 600,
          delay: function(el, i, l) {
            return i * 100;
          },
        });
    }
  }

  toggleMenuNavigation() {
    const isMenuOpen = this.isMenuOpen();
    this.menuNavigation.classList.toggle("active");
    const menuNavTimeline = anime.timeline({
      easing: "easeInQuint",
      duration: 250,
    });
    if (isMenuOpen) {
      menuNavTimeline
        .add({
          targets: this.menuNavigation,
          translateY: "0%",
        })
        .add({
          targets: [this.menuNavigationSailLeft, this.menuNavigationSailRight],
          translateY: "0%",
          easing: function(el, i) {
            return i == 0 ? "easeOutExpo" : "easeOutCirc";
          },
          offset: "-=50",
          duration: 1000,
        })
        .add({
          targets: this.menuNavigationLinks,
          translateY: "0%",
          offset: 400,
          duration: 600,
        });
    } else {
      menuNavTimeline
        .add({
          targets: this.menuNavigation,
          translateY: "-100%",
        })
        .add({
          targets: [this.menuNavigationSailLeft, this.menuNavigationSailRight],
          translateY: "-100%",
          easing: function(el, i) {
            return i == 0 ? "easeOutExpo" : "easeOutCirc";
          },
        })
        .add({
          targets: this.menuNavigationLinks,
          translateY: "-100%",
        });
    }
  }

  registerHandlers() {
    this.menuBtn.addEventListener("click", () => this.handleMenuClick());
  }

  unRegisterHandlers() {
    this.menuBtn.removeEventListener("click", () => this.handleMenuClick());
  }
}
