import Browser from '@mediamonks/temple/util/Browser';
import ConfigComponent from '@mediamonks/temple/component/ConfigComponent';
import ElementComponent from '@mediamonks/temple/component/ElementComponent';
import Entity from '@mediamonks/temple/Entity';
import $ from '@mediamonks/temple/util/$';
import EmbedSVGComponent from '@mediamonks/temple/component/EmbedSVGComponent';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import AutoEntityComponent from '@mediamonks/temple/component/AutoEntityComponent';
import VideoComponent from '@mediamonks/temple/component/VideoComponent';
import KnockoutComponent from "@mediamonks/temple/component/KnockoutComponent";
import config from './.richmediarc';

class Banner extends Entity {
  /**
   *
   * @type {{entry: {js: string, html: string}, size: {width: number, height: number}}|settings|{entry, size}|module:cluster.ClusterSettings|*|{}}
   */
  settings = config.settings;

  constructor() {
    super();


    this.addComponent(new ElementComponent('body'));
    // this.addComponent(new ConfigComponent(config));
    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new EmbedSVGComponent());
    this.addComponent(new AutoEntityComponent());
  }

  init() {
    return super.init().then(() => {
      this.setupBanner();
      document.body.querySelector('#banner').classList.remove('hide');
      this.startAnimation();


      this.findByName('video')
    });
  }

  setupBanner() {
    this.time = 0;
    this.rolloverAllowed = false;
    this.playedTrailer = false;
    this.isPost = true;

    if (this.isPost) {
      amazonLogo.src = require('./img/amazon_logo_post.png');
      const overElements = document.querySelectorAll('.over2');
      const outElements = document.querySelectorAll('.out');

      for (let i = 0; i < overElements.length; i++) {
        overElements[i].src = require('./img/cta_over_post.png');
      }

      for (let i = 0; i < outElements.length; i++) {
        outElements[i].src = require('./img/cta_post.png');
      }
    }

    //intro SVG elements
    this.showTitle = Prime_Member_Exclusive.getElementsByTagName('path');
    this.primeLine1 = The_Grand_Tour.getElementsByTagName('path');
    this.primeLine2 = The_Grand_Tour.getElementsByTagName('polyline');
    this.leftLines = [Line_01_Left, Line_02_Left, Line_03_Left, [Line_04_Left, Line_04_Middle], Line_05_Left];
    this.rightLines = [Line_01_Right, Line_02_Right, Line_03_Right, Line_04_Right, Line_05_Right];
    TweenMax.set([this.showTitle, this.primeLine1, this.primeLine2], { fill: '#fff' });

    //Tween cta elements
    this.ctaWidth = document.querySelector('#ctaTrailer').offsetWidth;
    TweenMax.to(
      [
        document.querySelectorAll('.cta1.over')[0],
        document.querySelectorAll('.cta3.over')[0],
        document.querySelectorAll('.cta5.over')[0],
        document.querySelectorAll('.cta1.over')[1],
        document.querySelectorAll('.cta3.over')[1],
        document.querySelectorAll('.cta5.over')[1],
      ],
      0,
      { x: this.ctaWidth / 2, opacity: 0 }
    );

    TweenMax.to(
      [
        document.querySelectorAll('.cta2.over')[0],
        document.querySelectorAll('.cta4.over')[0],
        document.querySelectorAll('.cta2.over')[1],
        document.querySelectorAll('.cta4.over')[1],
      ],
      0,
      {
        x: -this.ctaWidth / 2,
        opacity: 0,
      }
    );

    //masterTimeLine
    this.masterTimeline = new TimelineMax({
      paused: true,
      onComplete: () => {
        if (!Browser.isMobile) {
          this.rolloverAllowed = true;
        }
      },
    });
    this.masterTimeline.add('start', '0');
    this.masterTimeline.add(this.getLogoSVGAnimation().timeScale(1.5), 'start');
    this.masterTimeline.to('#blackBg', 1.5, { opacity: 0, ease: Power1.easeOut }, '-=0.5');
    this.masterTimeline.add(this.getMonkeyAnimation().timeScale(1.5), '-=1');

    this.masterTimeline.to('#bgSky', 3, { x: -200, ease: Power1.easeOut }, '6.8');
    this.masterTimeline.to(['#bgGround'], 3, { x: -300, ease: Power1.easeOut }, '6.8');
    this.masterTimeline.from(['#logo'], 0.5, { x: 65, ease: Power1.easeOut }, '6.8');
    this.masterTimeline.from(
      ['#mainCopy', '#amazonLogo', '#ctaTrailer'],
      3,
      { opacity: 0, ease: Power1.easeInOut },
      '6.8'
    );
    this.masterTimeline.from(
      ['#heroesFront', '#heroesBack', '#carWrapper', '#carShadow', '#smokeWrapper'],
      3,
      { x: 300, ease: Power1.easeOut },
      '6.8'
    );
    this.masterTimeline.add(this.carAnimation(), '0');

    //rolloverTimeLine
    this.rolloverTL = new TimelineMax({ paused: true });
    this.rolloverTL.add('start', '0');
    this.rolloverTL.to(
      [
        document.querySelectorAll('.cta1')[1],
        document.querySelectorAll('.cta3')[1],
        document.querySelectorAll('.cta5')[1],
        document.querySelectorAll('.cta1')[3],
        document.querySelectorAll('.cta3')[3],
        document.querySelectorAll('.cta5')[3],
      ],
      0.5,
      { x: this.ctaWidth / 2, opacity: 0, ease: Power0.easeNone },
      'start'
    );
    this.rolloverTL.to(
      [
        document.querySelectorAll('.cta1.over')[0],
        document.querySelectorAll('.cta3.over')[0],
        document.querySelectorAll('.cta5.over')[0],
        document.querySelectorAll('.cta1.over')[1],
        document.querySelectorAll('.cta3.over')[1],
        document.querySelectorAll('.cta5.over')[1],
      ],
      0.5,
      { x: 0, opacity: 1, ease: Power0.easeNone },
      'start'
    );
    this.rolloverTL.to(
      [
        document.querySelectorAll('.cta2')[1],
        document.querySelectorAll('.cta4')[1],
        document.querySelectorAll('.cta2')[3],
        document.querySelectorAll('.cta4')[3],
      ],
      0.5,
      { x: -this.ctaWidth / 2, opacity: 0, ease: Power0.easeNone },
      'start'
    );
    this.rolloverTL.to(
      [
        document.querySelectorAll('.cta2.over')[0],
        document.querySelectorAll('.cta4.over')[0],
        document.querySelectorAll('.cta2.over')[1],
        document.querySelectorAll('.cta4.over')[1],
      ],
      0.5,
      { x: 0, opacity: 1, ease: Power0.easeNone },
      'start'
    );
    this.rolloverTL.to('#monkeyMapWrapper', 0.5, { scaleX: 1.05, ease: Power1.easeInOut }, 'start');
    this.rolloverTL.to('#monkeyMapWrapper', 1, { rotation: -15, y: -10, x: 10, ease: Power1.easeInOut }, 'start');
    this.rolloverTL.to('#monkeyHead', 0.02, { opacity: 0, ease: Power1.easeInOut }, 'start');
    this.rolloverTL.to('#monkeyHead2', 0.02, { opacity: 1, ease: Power1.easeInOut, repeat: 1, yoyo: true }, 'start');
    this.rolloverTL.to('#monkeyHead3', 0.02, { opacity: 1, ease: Power1.easeInOut }, 'start+=0.02');
    this.rolloverTL.to('#monkeyEyes', 0.1, { opacity: 1, ease: Power1.easeInOut, repeat: 1, yoyo: true }, 'start+=0.5');
    this.rolloverTL.to(
      ['#carBody', '#carLights'],
      0.3,
      { y: 2, rotation: 1, ease: Power1.easeInOut, repeat: 1, yoyo: true },
      'start'
    );
    this.rolloverTL.to('#carShadow', 0.3, { scaleX: 1.02, ease: Power1.easeInOut, repeat: 1, yoyo: true }, 'start');
    this.rolloverTL.to('#carLights', 0.1, { opacity: 1, repeat: 1, repeatDelay: 0.5, yoyo: true });

    this.trailerOverTL = new TimelineMax({ paused: true });
    this.trailerOverTL.add('start', '0');
    this.trailerOverTL.to('#trailerBtn', 0.3, { opacity: 0, ease: Power0.easeNone }, 'start');

    this.playTrailerTL = new TimelineMax({ paused: true });
    this.playTrailerTL.add('start', '0');
    this.playTrailerTL.from(['#trailer', '#trailerThumbWrapper'], 0.5, { x: -500, ease: Power1.easeOut }, 'start');
    this.playTrailerTL.to(['#mainCopy', '#cta'], 0.5, { x: 350, ease: Power1.easeOut }, 'start');
    this.playTrailerTL.to(
      ['#heroesBack', '#heroesFront', '#carWrapper', '#carShadow', '#smokeWrapper'],
      0.5,
      { x: 300, ease: Power1.easeOut },
      'start'
    );
    this.playTrailerTL.to(['#bgGround'], 0.5, { x: '+=300', ease: Power1.easeOut }, 'start');
    this.playTrailerTL.to(['#bgSky'], 0.5, { x: '+=250', ease: Power1.easeOut }, 'start');
    this.playTrailerTL.to(['#monkeyWrapper', '#heroesFront'], 0.5, { x: 300, ease: Power1.easeOut }, 'start');
    this.playTrailerTL.to(['#logo'], 0.5, { x: -12, y: 173, ease: Power1.easeOut }, 'start');
    this.playTrailerTL.to(['#amazonLogo'], 0.5, { x: 136, y: 35, ease: Power1.easeOut }, 'start');

    TweenMax.set('#trailerBtnWrapper', { x: -50 });

    trailerBtnWrapper.addEventListener('click', this.playTrailer.bind(this));
    if (!Browser.isMobile) {
      trailerBtnWrapper.addEventListener(
        'mouseover',
        function() {
          this.trailerOverTL.play();
        }.bind(this)
      );
      trailerBtnWrapper.addEventListener(
        'mouseout',
        function() {
          this.trailerOverTL.reverse().timeScale(2);
        }.bind(this)
      );
    }

    trailerThumbWrapper.addEventListener(
      'click',
      function() {
        this.playTrailer();
      }.bind(this)
    );
    if (!Browser.isMobile) {
      trailerThumbWrapper.addEventListener(
        'mouseover',
        function() {
          TweenMax.to(replayBtn, 0.3, { scale: 1.2, ease: Power2.easeInOut });
        }.bind(this)
      );
      trailerThumbWrapper.addEventListener(
        'mouseout',
        function() {
          TweenMax.to(replayBtn, 0.3, { scale: 1, ease: Power2.easeInOut });
        }.bind(this)
      );
    }

    // $('.close').addEventListener('click', this.closeTrailer.bind(this));
    $('.closeVideoFrame').addEventListener('click', this.closeTrailer.bind(this));

    const [videoEntity] = this.findByName('video');
    const videoElement = videoEntity.getComponent(ElementComponent).get();
    const videoComponent = videoEntity.getComponent(VideoComponent);

    videoElement.addEventListener('click', this.onBannerClick);
  }

  getLogoSVGAnimation() {
    const animation = new TimelineMax({});
    animation.add('start', '0');
    animation.from(this.leftLines[0], 1, { x: -this.settings.size.width, ease: Power3.easeOut }, 'start');
    animation.from(this.rightLines[0], 1, { x: this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.leftLines[4], 1, { x: -this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.rightLines[4], 1, { x: this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.leftLines[1], 1, { x: -this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.rightLines[1], 1, { x: this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.leftLines[3], 1, { x: -this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.rightLines[3], 1, { x: this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.leftLines[2], 1, { x: -this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.from(this.rightLines[2], 1, { x: this.settings.size.width, ease: Power3.easeOut }, '-=0.95');
    animation.to(logoSVG, 4, { scale: 1.1, ease: Power0.easeNone });
    animation.from(this.showTitle, 2.3, { opacity: 0, ease: Power1.easeInOut }, 'start');
    animation.from([this.primeLine1, this.primeLine2], 2.3, { opacity: 0, ease: Power1.easeInOut }, 'start');

    animation.add('reverseLines', '-=1');

    animation.to(this.leftLines[2], 1, { x: -this.settings.size.width, ease: Power3.easeIn }, 'reverseLines');
    animation.to(this.rightLines[2], 1, { x: this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.leftLines[3], 1, { x: -this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.rightLines[3], 1, { x: this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.leftLines[1], 1, { x: -this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.rightLines[1], 1, { x: this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.leftLines[4], 1, { x: -this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.rightLines[4], 1, { x: this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.leftLines[0], 1, { x: -this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.rightLines[0], 1, { x: this.settings.size.width, ease: Power3.easeIn }, '-=0.95');
    animation.to(this.showTitle, 1, { opacity: 0, ease: Power1.easeInOut }, 'reverseLines');
    animation.to([this.primeLine1, this.primeLine2], 1, { opacity: 0, ease: Power1.easeInOut }, 'reverseLines');

    animation.fromTo(
      FlyByLine,
      4,
      { x: -this.settings.size.width * 3, scaleX: 3 },
      { x: this.settings.size.width * 3, ease: Power3.easeOut },
      'start'
    );
    animation.fromTo(
      FlyByLine2,
      4,
      { x: this.settings.size.width * 3, scaleX: 3 },
      { x: -this.settings.size.width * 3, ease: Power3.easeOut },
      '0.2'
    );
    animation.fromTo(
      FlyByLine3,
      4,
      { x: -this.settings.size.width * 3, scaleX: 3 },
      { x: this.settings.size.width * 3, ease: Power3.easeOut },
      '0.4'
    );
    animation.fromTo(
      FlyByLine4,
      4,
      { x: -this.settings.size.width * 3, scaleX: 3 },
      { x: this.settings.size.width * 3, ease: Power3.easeOut },
      '0.3'
    );
    animation.fromTo(
      FlyByLine5,
      4,
      { x: this.settings.size.width * 3, scaleX: 3 },
      { x: -this.settings.size.width * 3, ease: Power3.easeOut },
      '0.1'
    );

    animation.to(
      FlyByLine,
      2,
      { x: -this.settings.size.width * 3, scaleX: 3, ease: Power0.easeNone },
      'reverseLines-=0.6'
    );
    animation.to(
      FlyByLine5,
      2,
      { x: this.settings.size.width * 3, scaleX: 3, ease: Power0.easeNone },
      'reverseLines-=0.7'
    );
    animation.to(
      FlyByLine2,
      2,
      { x: this.settings.size.width * 3, scaleX: 3, ease: Power0.easeNone },
      'reverseLines-=0.5'
    );
    animation.to(
      FlyByLine4,
      2,
      { x: -this.settings.size.width * 3, scaleX: 3, ease: Power0.easeNone },
      'reverseLines-=0.6'
    );
    animation.to(
      FlyByLine3,
      2,
      { x: -this.settings.size.width * 3, scaleX: 3, ease: Power0.easeNone },
      'reverseLines-=0.5'
    );

    return animation;
  }

  getMonkeyAnimation() {
    const animation = new TimelineMax({});
    animation.add('start', '0');
    animation.to('#monkeyWrapper', 0, { x: 0 }, 'start');
    animation.from('#monkeyWrapper', 1, { y: 250, ease: Back.easeOut.config(1.5) }, 'start');
    animation.to('#monkeyMap', 0.5, { scaleX: 1.1, ease: Circ.easeInOut, repeat: 1, yoyo: true }, '-=0.1');
    animation.to('#monkeyLeftHand', 0.5, { x: -7, ease: Circ.easeInOut, repeat: 1, yoyo: true }, '-=1');
    animation.to('#monkeyRightHand', 0.5, { x: 7, ease: Circ.easeInOut, repeat: 1, yoyo: true }, '-=1');
    animation.to('#monkeyHead', 0.02, { opacity: 0, ease: Power1.easeInOut }, '-=0');
    animation.to('#monkeyHead2', 0.02, { opacity: 1, ease: Power1.easeInOut, repeat: 1, yoyo: true }, '-=0.02');
    animation.to('#monkeyHead3', 0.02, { opacity: 1, ease: Power1.easeInOut }, '-=0.02');
    animation.to('#monkeyEyes', 0.1, { opacity: 1, ease: Power1.easeInOut, repeat: 1, yoyo: true }, '+=0.6');
    animation.to('#monkeyHead3', 0.02, { opacity: 0, ease: Power1.easeInOut }, '+=1.1');
    animation.to('#monkeyHead2', 0.02, { opacity: 1, ease: Power1.easeInOut, repeat: 1, yoyo: true }, '-=0.02');
    animation.to('#monkeyHead', 0.02, { opacity: 1, ease: Power1.easeInOut }, '-=0.02');
    animation.to('#monkeyWrapper', 1, { y: 250, ease: Back.easeIn.config(1.5) }, '+=0');
    animation.to('#monkeyWrapper', 0, { x: 0 }, '+=0');
    animation.to('#monkeyWrapper', 0, { scale: 0.7, x: 70 }, '+=0');
    animation.to('#monkeyWrapper', 1, { y: 15, ease: Back.easeOut.config(1.5) }, '+=4');
    animation.to(
      '#monkeyMapWrapper',
      1,
      { rotation: 25, ease: Power1.easeInOut, transformOrigin: '110px 135px' },
      '+=0'
    );
    animation.to('#monkeyHead', 1, { rotation: 7, ease: Power1.easeInOut, transformOrigin: '30px 50px' }, '-=1');
    animation.to('#monkeyMapWrapper', 0.5, { scaleX: 1.05, ease: Power1.easeInOut, repeat: 1, yoyo: true }, '-=0.5');
    animation.to('#monkeyMapWrapper', 1, { rotation: -15, y: -10, x: 10, ease: Power1.easeInOut }, '+=1');
    animation.to('#monkeyHead', 1, { rotation: -10, ease: Power1.easeInOut }, '-=1');
    animation.to('#monkeyMapWrapper', 0.5, { scaleX: 1.05, ease: Power1.easeInOut, repeat: 1, yoyo: true }, '-=0.5');
    animation.to('#monkeyMapWrapper', 1.5, { x: 0, y: 0, rotation: 0, ease: Power1.easeInOut }, '+=0');
    animation.to('#monkeyHead', 1.5, { rotation: 0, ease: Power1.easeInOut }, '-=1.5');
    return animation;
  }

  carAnimation() {
    this.createSmoke();
    TweenMax.to('#smokeWrapper', 1, { opacity: 0, ease: Power1.easeIn, delay: 14 });

    this.carTL = new TimelineMax({});
    this.carTL.add('start', '0');
    this.carTL.to('#carLights', 0.1, { opacity: 1, repeat: 29, repeatDelay: 0.4, yoyo: true });
    return this.carTL;
  }

  startAnimation() {
    this.masterTimeline.play(0);
  }

  onOver() {
    if (this.rolloverAllowed) {
      this.rolloverTL.play().timeScale(2);
    }
  }

  onOut() {
    if (this.rolloverAllowed) {
      this.rolloverTL.reverse().timeScale(2);
    }
  }

  playTrailer() {
    const [videoComponent] = this.findByName('video');
    document.querySelector('.closeVideoFrame').classList.remove('hide');
    this.playedTrailer = true;

    if (this.masterTimeline.progress() < 0.7 || this.playTrailerTL.progress() == 1) {
      this.masterTimeline.progress(1);
      this.playTrailerTL.progress(1);
    } else {
      this.masterTimeline.progress(1);
      this.playTrailerTL.play(0);
    }

    document.querySelector('#ctaTrailer').classList.add('hide');
    document.querySelector('#cta').classList.remove('hide');

    TweenMax.to('#trailerBtnWrapper', 0.5, { x: -50, ease: Power1.easeOut });

    logo.style.left = '35px';
  }

  closeTrailer() {
    TweenMax.to('#trailerBtnWrapper', 0.5, { x: 0, ease: Power1.easeOut });
    // this.v_trailer.hide(0);
    this.playTrailerTL.reverse();
    document.querySelector('.closeVideoFrame').classList.add('hide');
  }

  onBannerClick = () => {
    if (!this.playedTrailer) {
      this.playTrailer();
    } else {
      this.masterTimeline.progress(1);
      this.exit();
    }
  };

  onExit = () => {
    this.closeTrailer();
    this.time = 16;
    TweenMax.set('#smokeWrapper', { opacity: 0 });
  };

  createSmoke() {
    this.time += 0.08;
    if (this.time < 15) {
      this.createSmokeCloud();
      this.smokeDelayedCall = TweenMax.delayedCall(0.08, this.createSmoke.bind(this));
    } else {
      TweenMax.killTweensOf($('.smokeCloud'));
    }
  }

  createSmokeCloud() {
    this.smokeCloud = document.createElement('img');
    this.smokeCloud.className = 'smokeCloud';
    this.smokeCloud.src = require('./img/smoke.png');
    this.smokeCloud.style.width = this.randomNumber(150, 200) + 'px';
    this.smokeCloud.style.top = '16px';
    this.smokeCloud.style.left = this.randomNumber(50, 130) + 'px';
    this.smokeCloud.style.opacity = this.randomNumber(0.21, 0.43);
    smokeWrapper.appendChild(this.smokeCloud);

    TweenMax.fromTo(
      this.smokeCloud,
      this.randomNumber(3.5, 4),
      { scale: 0, rotation: this.randomNumber(-400, 400) },
      {
        scale: 1.5,
        rotation: 0,
        y: -350,
        x: this.randomNumber(300, 400),
        ease: Power1.easeIn,
        force3D: false,
        onComplete: function() {
          smokeWrapper.removeChild(this.target);
        },
      }
    );
  }

  randomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
}

const banner = new Banner();
banner.init();
