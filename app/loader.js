import "styles/loader.scss";
import anime, { timeline } from "animejs";

window.addEventListener("load", () => {
  var loaderTimeline = timeline();
  loaderTimeline
    .add({
      targets: ".loader-svg path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 2500,
    })
    .finished.then(() => {
      import(/* webpackChunkName: "index"*/ "./index").then(module => {
        timeline()
          .add({
            targets: ".loader-svg",
            opacity: 0,
            duration: 1500,
            easing: "easeInQuad",
          })
          .add({
            targets: ".loader",
            translateY: "200%",
            duration: 1,
          })
          .add({
            targets: ".content-body .intro",
            opacity: 1,
            duration: 100,
          })
          .finished.then(() => {
            document.querySelector(".loading").classList.remove("loading");
            document.querySelector(".app.hidden").classList.remove("hidden");
            anime({
              targets: ".app",
              style: "visibility: visible",
            });
            const App = module.default;
            const myApp = new App();
          });
      });
    });
});
