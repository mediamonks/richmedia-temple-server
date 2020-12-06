import Entity from '@mediamonks/temple/Entity';
import dataBind from '@mediamonks/temple/util/dataBind';
// import dataBind from "./dataBind";

import Animation from './Animation';

export default class Banner extends Entity {

  constructor(config) {
    super();

    // add required components here
    this.config = config;
  }

  async init() {
    await super.init();

    dataBind(this.config.content, document.body);

    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.animation = new Animation(document.querySelector('.banner'), this.config);

    let timer = 0;

    setInterval(() => {
      this.config.content.bgcolor = `#${Math.floor(Math.random()*16777215).toString(16)}`
    }, 1000);
  }

  exit = () => {
    window.open(window.clickTag, '_blank');
    this.handleExit();
  };

  handleExit = () => {
    this.animation.playFadeOut();
  };

  /**
   * When client clicks this function will be triggerd.
   */
  handleClick = () => {
    this.exit();
  };

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {

  };

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {

  };

  async start() {
    await this.init();

    this.animation.playFadeIn();
  }
}

