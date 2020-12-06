export default class Animation {
  /**
   *
   * @param {HTMLDivElement} container
   */
  constructor(container, config) {
    this.container = container;
    this.config = config;

    this.fadeIn = new TimelineMax({pause: true});
    this.fadeIn.to(".banner", 1, {opacity: 1});

  }

  async playFadeIn() {
    this.fadeIn.play();
  }

  async playFadeOut() {
    const tl = new TimelineMax({pause: true});
    tl.to(".banner", 1, {opacity: 0});
    tl.play();
  }
}
