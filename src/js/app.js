import { PageScroll, ArticleNavigation, SetPageTheme, ButtonRippleEffect, imgLasyLoading } from "./modules/projectMetods.js";
import { isWebp } from "./modules/isWebpSupport.js";
import { cookiesEvents } from "./modules/cookies.js";
import "./modules/pageSwiper.js";
import "./modules/maps.js";

import LazyLoad from "vanilla-lazyload";
const lazyLoadInstance = new LazyLoad({
    callback_error: (img) => {
        img.setAttribute("srcset", "fallback_image@1x.jpg 1x, fallback_image@2x.jpg 2x");
        img.setAttribute("src", "fallback_image@1x.jpg");
      }
});
lazyLoadInstance.update();

isWebp();
cookiesEvents();

class InitPage {
    constructor() {
        this.pageScroll = new PageScroll();
        this.ripple = new ButtonRippleEffect();
    }

    init() {
        this.pageScroll.headerScrollEvent();
        this.ripple.rippleEvent();
    }
}

let init = new InitPage();
init.init();