import Entity from '@mediamonks/temple/Entity';

import Animation from './Animation';
import dataBind from "@mediamonks/temple/util/dataBind";


export default class Banner extends Entity {
  constructor(config) {
    super();

    this.config = config;

    console.log(this.config.content);

    // bind variable to html
    dataBind(this.config.content, document.body);
  }

  async init() {
    await super.init();

    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.animation = new Animation(document.querySelector('.banner'), this.config);
  }

  exit = () => {
    window.open(window.clickTag, '_blank');
    this.handleExit();
  };

  handleExit = () => {

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

  async start(){
    await this.init();
    this.animation.play();
  }
}

