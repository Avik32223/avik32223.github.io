import BaseController from "./BaseController";
import anime, { timeline } from "animejs";

const getDefaultAnimatePropertySequence = (target, options = {}) => {
  const targets = Array.isArray(target) ? target : [target];
  return {
    targets: targets.map(targetSelector =>
      document.querySelectorAll(targetSelector),
    ),
    easing: "easeOutQuad",
    duration: 600,
    ...options,
  };
};

export default class ShowcaseController extends BaseController {
  constructor() {
    super();
    this.entryPages = [1, 2, 3];
    this.exitPages = [1, 3];
    this.page = document.querySelector(".showcase");
  }

  getProjectNameEnterSequence({ toPage }) {
    const sequence = [];
    if (toPage && this.entryPages.indexOf(toPage) >= 0) {
      const toProjectElementWidth = document.querySelector(
        `.project-name-${toPage}`,
      ).clientWidth;
      sequence.push(
        getDefaultAnimatePropertySequence(".line-side-top-left-right", {
          left: `${toProjectElementWidth + 32}px`,
          offset: 0,
          duration: 400,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(`.project-name-${toPage}`, {
          translateY: "0%",
          offset: 100,
        }),
      );
    }
    return sequence;
  }

  getProjectButtonEnterSequence({ toPage }) {
    const sequence = [];
    const lineSideBottomWidth = document.querySelector(".line-side-bottom")
      .clientWidth;
    if (toPage && this.entryPages.indexOf(toPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(".project-btn-container", {
          translateY: "0%",
          offset: 0,
          duration: 0,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(".line-wrapper-bottom-left", {
          width: `${lineSideBottomWidth / 2 - 111}px`,
          offset: 0,
          duration: 200,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(".line-wrapper-bottom-right", {
          width: `${lineSideBottomWidth / 2 - 111}px`,
          offset: 0,
          duration: 200,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(`.project-btn-${toPage}`, {
          translateX: "0",
          translateY: "0%",
          offset: 100,
          duration: 600,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(`.project-btn-mask-${toPage}`, {
          translateX: "0",
          translateY: "0%",
          offset: 0,
          duration: 600,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(`.project-btn-mask-${toPage}`, {
          translateX: "0",
          translateY: "-100%",
          offset: 700,
        }),
      );
    }
    return sequence;
  }

  getProjectImageEnterSequence({ toPage }) {
    const sequence = [];
    if (toPage && this.entryPages.indexOf(toPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(
          [`.project-image-${toPage}-a`, `.project-image-${toPage}-b`],
          {
            translateX: "0%",
            offset: 0,
            duration: 1250,
          },
        ),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [`.project-image-${toPage}-a`, `.project-image-${toPage}-b`],
          {
            opacity: 1,
            offset: 0,
            duration: 1250,
          },
        ),
      );
    }
    return sequence;
  }

  getProjectRoleTeamYearEnterSequence({ toPage }) {
    const sequence = [];
    if (toPage && this.entryPages.indexOf(toPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(
          [".project-role", ".project-team", ".project-year"],
          {
            translateY: "0%",
            offset: 0,
            duration: 600,
          },
        ),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [`.project-value-${toPage}`, ".project-value-title"],
          {
            translateX: "0",
            translateY: "0%",
            offset: 600,
          },
        ),
      );
    }
    return sequence;
  }

  getFrameEnterSequence({ fromPage }) {
    const sequence = [];
    if (fromPage == 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(
          [
            ".line-side-left-top",
            ".line-side-right-top",
            ".line-side-left-bottom",
            ".line-side-right-bottom",
          ],
          {
            translateY: "0%",
            offset: 0,
          },
        ),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [
            ".line-side-bottom-left",
            ".line-side-bottom-right",
            ".line-side-top-left-left",
            ".line-side-top-left-right",
            ".line-side-top-right",
          ],
          {
            translateX: "0%",
            offset: 0,
          },
        ),
      );
    }
    return sequence;
  }

  getProjectAboutDescriptionEnterSequence({ toPage }) {
    const sequence = [];
    if (toPage && this.entryPages.indexOf(toPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(".project-line", {
          translateX: "0%",
          offset: 0,
          duration: 400,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [`.project-about-title-${toPage}`, `.project-about-detail-${toPage}`],
          {
            translateY: "0%",
            offset: 0,
            duration: 400,
          },
        ),
      );
    }
    return sequence;
  }

  getProjectNameExitSequence({ fromPage, toPage }) {
    const sequence = [];
    if (fromPage && this.entryPages.indexOf(fromPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(`.project-name-${fromPage}`, {
          translateY: "100%",
          offset: 0,
        }),
      );
    }
    if (toPage == 0 || toPage > 3) {
      sequence.push(
        getDefaultAnimatePropertySequence(".line-side-top-left-right", {
          left: `32px`,
        }),
      );
    }
    if (toPage > 3) {
      const lineSideBottomWidth = document.querySelector(".line-side-bottom")
        .clientWidth;
      sequence.push(
        getDefaultAnimatePropertySequence(".project-btn-container", {
          translateY: "300%",
          offset: 600,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [".line-wrapper-bottom-left", ".line-wrapper-bottom-right"],
          {
            width: `${lineSideBottomWidth / 2}px`,
          },
        ),
      );
    }
    return sequence;
  }

  getProjectButtonExitSequence({ fromPage }) {
    const sequence = [];
    if (fromPage && this.entryPages.indexOf(fromPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(`.project-btn-${fromPage}`, {
          translateX: "0",
          translateY: "108%",
          offset: 0,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(`.project-btn-mask-${fromPage}`, {
          translateX: "0",
          translateY: "108%",
          duration: 0,
        }),
      );
    }
    return sequence;
  }

  getProjectImageExitSequence({ fromPage, toPage }) {
    const sequence = [];
    if (fromPage && this.entryPages.indexOf(fromPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(
          [`.project-image-${fromPage}-a`, `.project-image-${fromPage}-b`],
          {
            translateX: "50%",
            offset: 0,
            duration: 1250,
          },
        ),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [`.project-image-${fromPage}-a`, `.project-image-${fromPage}-b`],
          {
            opacity: 0,
            offset: 50,
            duration: 250,
          },
        ),
      );
    }
    return sequence;
  }

  getProjectRoleTeamYearExitSequence({ fromPage, toPage }) {
    const sequence = [];
    if (fromPage && this.entryPages.indexOf(fromPage) >= 0) {
      if (toPage == 0 || toPage > 3) {
        sequence.push(
          getDefaultAnimatePropertySequence(
            [".project-role", ".project-team", ".project-year"],
            {
              translateY: "100%",
              offset: 0,
              duration: 600,
            },
          ),
        );
        sequence.push(
          getDefaultAnimatePropertySequence([".project-value-title"], {
            translateY: "108%",
            offset: 0,
            duration: 600,
          }),
        );
      }
      sequence.push(
        getDefaultAnimatePropertySequence([`.project-value-${fromPage}`], {
          translateX: "0",
          translateY: "108%",
          offset: 0,
          duration: 600,
        }),
      );
    }
    return sequence;
  }

  getFrameExitSequence({ toPage }) {
    const sequence = [];
    if (toPage == 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(
          [".line-side-left-top", ".line-side-right-top"],
          {
            translateY: "-100%",
            offset: 0,
          },
        ),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [".line-side-left-bottom", ".line-side-right-bottom"],
          {
            translateY: "100%",
            offset: 0,
          },
        ),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [
            ".line-side-bottom-left",
            ".line-side-top-left-left",
            ".line-side-top-right",
          ],
          {
            translateX: "-100%",
            offset: 0,
          },
        ),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [".line-side-bottom-right", ".line-side-top-left-right"],
          {
            translateX: "100%",
            offset: 0,
          },
        ),
      );
    }
    return sequence;
  }

  getProjectAboutDescriptionExitSequence({ fromPage }) {
    const sequence = [];
    if (fromPage && this.entryPages.indexOf(fromPage) >= 0) {
      sequence.push(
        getDefaultAnimatePropertySequence(".project-line", {
          translateX: "100%",
          offset: 0,
          duration: 400,
        }),
      );
      sequence.push(
        getDefaultAnimatePropertySequence(
          [
            `.project-about-title-${fromPage}`,
            `.project-about-detail-${fromPage}`,
          ],
          {
            translateY: "100%",
            offset: 0,
            duration: 400,
          },
        ),
      );
    }
    return sequence;
  }

  handleProjectEnterTransition(options) {
    const { fromPage, toPage } = options;
    const frameSequence = this.getFrameEnterSequence(options);
    const projectNameSequence = this.getProjectNameEnterSequence(options);
    const projectButtonSequence = this.getProjectButtonEnterSequence(options);
    const projectImageSequence = this.getProjectImageEnterSequence(options);
    const projectAboutDescriptionSequence = this.getProjectAboutDescriptionEnterSequence(
      options,
    );
    const projectRoleTeamYearSequence = this.getProjectRoleTeamYearEnterSequence(
      options,
    );
    const entryTimeline = [
      frameSequence,
      projectNameSequence,
      projectButtonSequence,
      projectImageSequence,
      projectAboutDescriptionSequence,
      projectRoleTeamYearSequence,
    ].filter(e => e.length);

    const entryAnimationTimeline = timeline({
      duration: 650,
      easing: "easeInQuint",
    });

    entryTimeline.reduce((timeline, sequence) => {
      return timeline.add(sequence);
    }, entryAnimationTimeline);

    return entryTimeline.length
      ? entryAnimationTimeline.finished.then(() => true)
      : Promise.resolve(false);
  }

  handleProjectExitTransition(options) {
    const { fromPage, toPage } = options;
    const frameSequence = this.getFrameExitSequence(options);
    const projectNameSequence = this.getProjectNameExitSequence(options);
    const projectButtonSequence = this.getProjectButtonExitSequence(options);
    const projectImageSequence = this.getProjectImageExitSequence(options);
    const projectAboutDescriptionSequence = this.getProjectAboutDescriptionExitSequence(
      options,
    );
    const projectRoleTeamYearSequence = this.getProjectRoleTeamYearExitSequence(
      options,
    );
    const exitTimeline = [
      frameSequence,
      projectNameSequence,
      projectButtonSequence,
      projectImageSequence,
      projectAboutDescriptionSequence,
      projectRoleTeamYearSequence,
    ].filter(e => e.length);

    const exitAnimationTimeline = timeline({
      duration: 200,
      easing: "linear",
    });

    exitTimeline.reduce((timeline, sequence) => {
      return timeline.add(sequence);
    }, exitAnimationTimeline);

    return exitTimeline.length
      ? exitAnimationTimeline.finished.then(() => true)
      : Promise.resolve(false);
  }

  handlePageEnter({ fromPage, toPage }) {
    if (this.entryPages.indexOf(toPage) >= 0) {
      return this.handleProjectEnterTransition({ fromPage, toPage }).then(
        result =>
          new Promise(resolve => {
            setTimeout(() => resolve(result), 250);
          }),
      );
    }
    return Promise.resolve(false);
  }

  handlePageExit({ fromPage, toPage }) {
    return this.handleProjectExitTransition({ fromPage, toPage }).then(
      result =>
        new Promise(resolve => {
          setTimeout(() => resolve(result), 250);
        }),
    );
  }

  handlesPageEnter({ toPage }) {
    if (toPage !== 0) {
      return true;
    }
    return false;
  }

  handlesPageExit({ fromPage, toPage }) {
    if (fromPage !== 0) {
      return true;
    }
    return false;
  }
}
