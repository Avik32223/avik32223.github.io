export default class BaseController {
  constructor() {}

  handlesPageEnter({ fromPage, toPage }) {
    return false;
  }

  handlesPageExit({ fromPage, toPage }) {
    return false;
  }

  handlePageEnter({ fromPage, toPage }) {
    return Promise.resolve(false);
  }
  handlePageExit({ fromPage, toPage }) {
    return Promise.resolve(false);
  }
}
