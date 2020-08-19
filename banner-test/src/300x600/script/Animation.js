export default class Animation {

  constructor (container, config)
  {
    this.container = container;
    this.config = config;

    this.tl = new TimelineMax({pause: true});
    this.tl.to(".banner", 1, {opacity: 1});
  }

  play ()
  {
    this.tl.play()
  }
}
