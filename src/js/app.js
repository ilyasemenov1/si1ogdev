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
        this.ripple = new ButtonRippleEffect();
        this.articleNavigation = new ArticleNavigation("header_link"); 
    }

    init() {
        this.ripple.rippleEvent();
        this.articleNavigation.articleDocInit();
    }
}

let init = new InitPage();
init.init();