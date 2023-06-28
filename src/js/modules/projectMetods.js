
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import '../../../node_modules/swiper/swiper-bundle.min.css';
    
Swiper.use([Navigation, Pagination, Autoplay]);

class PageScroll {
    constructor() {
        this.header = document.querySelector(".header");
        this.baseHeaderHeight = this.header.clientHeight;
        this.main = document.querySelector("main");
        this.main.style = `padding-top: ${this.baseHeaderHeight}px`;
        this.delta = 500;
        this.lastKeypressTime = 0;
    }

    headerScrollEvent() {
        window.addEventListener("scroll", () => {
            this.scroll();
        });
        window.addEventListener("load", () => {
            this.scroll();
        });
        window.addEventListener("keydown", (event) => {
            this.doubleArrowKeypress(event);
        });
    }

    doubleArrowKeypress(event) {
        switch(event.key){
            case "ArrowUp":
                this.doubleKeyEvent(
                    function() {window.scrollTo({top: 0, behavior: 'smooth'})}
                );
                break;
            case "ArrowDown":
                this.doubleKeyEvent(
                    function() {window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}
                );
                break; 
        }
    }

    doubleKeyEvent(callback) {
        let thisKeypressTime = new Date();
        if (thisKeypressTime - this.lastKeypressTime <= this.delta ) {
            callback(); 
            thisKeypressTime = 0;
        }
        this.lastKeypressTime = thisKeypressTime;
    }

    scroll() {
        let pageScroll = window.pageYOffset;
        const SCROLL_POINT = this.baseHeaderHeight - 20;

        if (pageScroll > SCROLL_POINT) {
            this._constractHeader();
        } else if (pageScroll <= SCROLL_POINT) {
            this._removeScrollHeader();
        }
    }

    _constractHeader() {
        this.header.classList.add("scrolled");
    }

    _removeScrollHeader() {
        this.header.classList.remove("scrolled");
    }
}


class TextCopy {
    constructor(element) {
        this.element = element;
        this.isAddNotify = JSON.parse(sessionStorage.getItem("isAddNotify"));
    }

    copyTextButtonEvent() {
        let inputId = this.element.dataset.id;
        let input = document.getElementById(inputId);
        if (!input) { 
            throw Error("input id and element id don't match")
        }

        input.select();
        input.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(input.value);
        if (this.isAddNotify) {
            this.#addEventNotify();
        }
    }

    copyTextArticleButtonEvent() {
        let text = this.element.dataset.value;

        navigator.clipboard.writeText(text);
        if (this.isAddNotify) {
            this.#addEventNotify();
        }
    }

    #addEventNotify() {
        sessionStorage.setItem("isAddNotify", JSON.stringify(false));
        let text = "Текст скопирован в буфер обмена";

        if (this.element.classList.contains("call")) {
            text = "Телефон скопирован в буфер обмена";
        } else if (this.element.classList.contains("email")) {
            text = "Почта скопирована в буфер обмена";
        }


        let notify = document.createElement("div");
        notify.className = "buffer-notify";
        notify.innerHTML = `
        <span class="buffer-notify_icon">
            <svg
                version="1.1"
                id="svg13224"
                width="425.95273"
                height="425.69327"
                viewBox="0 0 425.95273 425.69327"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg">
            <defs id="defs13228" />
            <g
                id="g13230"
                transform="translate(-41.884396,-21.383595)">
                <path
                    style="fill:#ffffff;fill-opacity:0.87"
                    d="M 109.72995,445.90565 C 82.303128,440.3803 57.628738,419.7159 47.653468,393.91761 c -6.06732,-15.69147 -5.97473,-13.71468 -5.64903,-120.59719 l 0.29692,-97.43683 2.29378,-7.46134 c 8.79229,-28.60001 30.60165,-50.37684 58.568742,-58.48138 4.85355,-1.4065 9.67429,-2.55728 10.71277,-2.55728 1.83631,0 1.88821,2.3809 1.89095,86.75 0.002,57.10543 0.3797,89.82552 1.10572,95.75 3.41097,27.83438 13.6721,49.04228 33.39146,69.0141 14.83828,15.02826 28.21225,23.51079 46.5,29.49293 17.382,5.68586 21.97243,5.98059 93.25,5.98707 35.6125,0.003 64.75,0.24586 64.75,0.53914 0,0.29329 -1.17877,2.88079 -2.61949,5.75 -8.73204,17.39001 -25.70902,33.23492 -43.16322,40.28498 -15.42385,6.22997 -9.46786,5.88543 -105.21729,6.08655 -68.97153,0.14487 -88.88378,-0.095 -94.03483,-1.13271 z m 108.53483,-85.00683 c -34.15615,-6.54427 -60.33712,-31.78884 -68.32874,-65.88486 -1.50163,-6.40663 -1.67011,-16.97594 -1.65995,-104.13037 l 0.0113,-97 2.21641,-8 c 1.21903,-4.4 4.54832,-12.65852 7.39842,-18.35228 8.70822,-17.39679 24.84836,-32.388876 42.96491,-39.90882 14.68449,-6.095335 16.61406,-6.238896 83.85549,-6.238896 h 61.04216 l 0.0148,31.249996 c 0.0168,35.48218 0.47624,38.86677 7.16079,52.75 3.36355,6.98582 5.71651,10.1239 13.20852,17.61591 7.49201,7.49201 10.63009,9.84497 17.61591,13.20852 13.88557,6.68568 17.26418,7.14401 52.78616,7.16079 l 31.28616,0.0148 -0.3129,74.75 c -0.31055,74.18738 -0.3298,74.80506 -2.55768,82.065 -8.80932,28.7067 -29.97665,49.93325 -58.70174,58.86595 l -9,2.79874 -86,0.18837 c -68.39503,0.1498 -87.43296,-0.0862 -93,-1.15283 z M 404.05082,109.93284 c -10.21916,-3.19373 -18.49259,-10.49453 -23.15087,-20.42924 -2.61252,-5.57171 -2.63771,-5.8499 -2.93108,-32.37001 -0.16275,-14.712496 0.0643,-26.749996 0.50463,-26.749996 0.4403,0 19.02137,18.225 41.29128,40.499996 l 40.49074,40.5 -25.99537,-0.0669 c -18.53475,-0.0477 -27.20477,-0.44486 -30.20933,-1.38385 z"
                    id="path13714" />
            </g>
            </svg>
        </span>
        <span class="buffer-notify_text">
            ${text}
        </span>
        `

        document.body.append(notify);

        setTimeout(() => {
            this.#appendToPage();
        }, 80);
    }

    #appendToPage() {
        let notify_e = document.querySelector(".buffer-notify");

        let left = window.innerWidth / 2 - notify_e.clientWidth / 2 - 15;
        let top = window.innerHeight - notify_e.clientHeight - 30;
        notify_e.style = `left: ${left}px; top: ${top}px`;
        notify_e.classList.add("active")

        setTimeout(() => {
            notify_e.classList.add("remove");
            setTimeout(() => {
                notify_e.remove();
                sessionStorage.setItem("isAddNotify", JSON.stringify(true));
            }, 200)
        }, 1000);
    }
}

class ArticleNavigation {
    constructor(linkName) {
        this.articleLabels = document.querySelectorAll(".navigation");
        this.linksConteiner = document.querySelector(".header_links-conteiner");
        this.linksWrapper = document.querySelector("nav");
        this.linkName = linkName;
    }

    articleDocInit() {
        if (this.linksConteiner) {
            this.articleLabels.forEach(element => {
                this.#refreshLabel(element);
                this.#generateLink(element);
            });
            window.addEventListener("scroll", () => {
                this.#changeLinkState();
                this.#findActiveLabel();
            });
            this.#changeLinkState();
            this.#generateLinksMark();
        }
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                try {
                    const yOffset = -100;
                    let element = document.querySelector(this.getAttribute('href'));
                    let yPos = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: yPos, behavior: 'smooth'});
                } catch {}
            });
        });
        let pageScroll = new PageScroll();
        pageScroll.headerScrollEvent();
        setTimeout(() => {
            this.#findActiveLabel();
        }, 100)
    }

    #refreshLabel(element) {
        const cyrillicToTranslit = new CyrillicToTranslit();
        let text = element.textContent;
        let transformedText = cyrillicToTranslit.transform(text, '_').toLowerCase();
        transformedText = transformedText.replaceAll('.', '_');
        transformedText = transformedText.replaceAll('/', '');
        transformedText = transformedText.replaceAll(',', '');
        transformedText = transformedText.replaceAll('(', '');
        transformedText = transformedText.replaceAll(')', '');
        transformedText = transformedText.replaceAll('"', '');
        transformedText = transformedText.replaceAll(`'`, '');
        element.id = transformedText;
        element.innerHTML = `
            <a href="#${transformedText}">${text}</a>
        `
    }

    #generateLink(element) {
        let link = document.createElement("a");
        link.textContent = element.textContent;
        link.href = `#${element.id}`;
        link.id = `${element.id}_nav`;
        link.className = this.linkName;
        this.linksConteiner.append(link);
    }

    #changeLinkState() {
        const links = document.querySelectorAll(`.${this.linkName}`);
        const sections = this.articleLabels;

        let index = sections.length;
        const topicVeiwOnScreen = 200;

        while(--index && window.scrollY + topicVeiwOnScreen < sections[index].offsetTop) {}
        
        links.forEach((link) => link.classList.remove('active'));
        links[index].classList.add('active');
    }

    #generateLinksMark() {
        let mark = document.createElement("span");
        mark.className = "links-mark";
        this.linksConteiner.append(mark);
    }

    #findActiveLabel() {
        let mark = document.querySelector(".links-mark");
        let links = document.querySelectorAll(`.${this.linkName}`);
        let positionX = 0;
        let positionY = 0;
        let width = 0
        const TOP_MARGIN = 2;
        const DELTA = 10;
        links.forEach(element => {TOP_MARGIN
            if (element.classList.contains("active")) {
                width = element.clientWidth;
                positionX = element.offsetLeft;
                positionY = element.offsetTop + element.clientHeight + TOP_MARGIN;
                mark.style = `transform: translateX(${positionX + DELTA/2}px); width: ${width - DELTA}px; top: ${positionY}px;`
            }
        });
    }
}

export class ButtonRippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll("button, a");
        this.button;
    }

    createRipple(event) {
        this.button = event.currentTarget;
        let circle = document.createElement("i");
        let diameter = Math.max(this.button.clientWidth, this.button.clientHeight);
        let radius = diameter / 2;
        let rect = this.button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - (rect.left + radius)}px`;
        circle.style.top = `${event.clientY - (rect.top + radius)}px`;
        circle.classList.add("ripple");

        if (diameter > 320) {
            circle.classList.add("blur400");
        } else if (320 >= diameter && diameter > 180) {
            circle.classList.add("blur200");
        } else if (180 >= diameter && diameter > 80) {
            circle.classList.add("blur100");
        } else {
            circle.classList.add("blur10");
        }

        this.removeRipple();
        this.button.appendChild(circle);
    }

    removeRipple() {
        let ripple = this.button.getElementsByClassName("ripple")[0];
        if (ripple) ripple.remove();
    }

    removeRippleVisible(event) {
        this.button = event.currentTarget;
        let children = this.button.children;
        [...children].forEach(element => {
            if (element.classList.contains("ripple")) element.classList.add("r-remove")
        });
    }

    rippleEvent() {
        this.buttons.forEach(element => {
            element.addEventListener("mousedown", (event) => {
                this.createRipple(event);
            });
            element.addEventListener("mouseup", (event) => {
                this.removeRippleVisible(event);
            });
            element.addEventListener("mouseout", (event) => {
                this.removeRippleVisible(event);
            });
        });
    }
}

export class imgLasyLoading {
    constructor() {
        this.imgs = document.querySelectorAll("img");
        this.innerImg, this.container;
    }

    lasyLoad() {
        this.imgs.forEach(element => {
            let pic = element.parentElement;
            let smallImg = document.createElement("span");
            smallImg.className = "img-small";
            smallImg.src = "";
            pic.append(smallImg);
            
            element.addEventListener("load", this.lasyLoadEvent)
        });
    }

    // lasyLoadEvent() {

    // }

    // createContainer(container, innerImg) {

    // }

    removeBlur(element) {
        element.classList.remove("blurred");
    }
}

export class SetPageTheme {
    constructor() {
        this.themeButtons = document.querySelectorAll(".theme-menu_select-button");
        this.themeMenuButton = document.querySelector(".header_theme-switch");
        this.theme = JSON.parse(localStorage.getItem("theme"));
    }

    themeSelectEvent() {
        this.themeButtons.forEach(element => {
            element.addEventListener("click", () => {
                this.clearThemeSelect();
                element.classList.add("active");

                let mode = element.dataset.value;
                this.themeMenuButton.classList.add(`dark-theme-${mode}`);
                localStorage.setItem("theme", JSON.stringify(mode));

                // Using a public function setUpMode
                mode !== "sys" ? setUpMode(mode) : void(0);

                this.setUpTheme(mode);
            });
        });
    }

    clearThemeSelect() {
        this.themeButtons.forEach(element => {
            element.classList.remove("active");
        });
        this.themeMenuButton.classList.remove("dark-theme-active", "dark-theme-sys", "dark-theme-disactive");
    }

    setUpTheme(theme) {
        switch(theme) {
            case "active":
                document.documentElement.classList.add("dark-theme");
                break
            case "sys":
                this.setAutoTheme(theme);
                break
            case "disactive":
                document.documentElement.classList.remove("dark-theme");
                break
            default:
                this.setAutoTheme(theme);
                localStorage.setItem("theme", JSON.stringify("sys"));
        }
    }

    setAutoTheme(mode) {
        // Using public functions getAutoTheme and setUpMode
        userTheme = getAutoTheme();
        setUpMode(mode, userTheme);
    }
}

export { PageScroll, TextCopy, ArticleNavigation }