import throttle from "lodash/throttle";
import debounce from 'lodash/debounce';
class StickyHeader {
    constructor(){
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.events();
    }
    events(){
        window.addEventListener("scroll", throttle(()=> this.runOnScroll(), 200));
        window.addEventListener("resize", debounce( ()=> {this.browserHeight = window.innerHeight;}, 350));
    }
    runOnScroll(){
        if(window.scrollY > 60){
            this.siteHeader.classList.add("site-header__dark");
        }
        else{
            this.siteHeader.classList.remove("site-header__dark");
        }
        this.pageSections.forEach(el => this.calcSection(el))
    }
    calcSection(el){
        let matchingLink = el.getAttribute("data-matching-link");
        if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < this.browserHeight + el.offsetTop){
            let scrollPercent = el.getBoundingClientRect().y/this.browserHeight * 100;
            if(scrollPercent < 18 && scrollPercent > -1){
                document.querySelectorAll(`.site-header__links a:not(${matchingLink})`).forEach(el=>el.classList.remove("is-currentLink"));
                document.querySelector(matchingLink).classList.add("is-currentLink");
            }else if(scrollPercent > 50){
                document.querySelector(matchingLink).classList.remove("is-currentLink");
            }
        }
        
    }
}

export default StickyHeader;