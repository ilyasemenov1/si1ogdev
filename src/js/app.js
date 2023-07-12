import { ArticleNavigation, SetPageTheme, ButtonRippleEffect, imgLasyLoading } from "./modules/projectMetods.js";
import { isWebp } from "./modules/isWebpSupport.js";

import LazyLoad from "vanilla-lazyload";

const lazyLoadInstance = new LazyLoad({
    callback_error: (img) => {
        img.setAttribute("src", "img/fallback.webp");
        let parent = img.parentElement;
        [...parent.children].forEach(element => {
            let tag = element.tagName;
            tag === "SOURCE" ? element.remove() : void(0)
        });
      }
});
lazyLoadInstance.update();

isWebp();

class InitPage {
    constructor() {
        this.ripple = new ButtonRippleEffect();
        this.articleNavigation = new ArticleNavigation("header_link"); 
        this.setpageTheme = new SetPageTheme();
    }

    init() {
        this.ripple.rippleEvent();
        this.articleNavigation.articleDocInit();
        this.setpageTheme.themeSelectEvent();
    }
}

let init = new InitPage();
init.init();