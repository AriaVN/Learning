import throttle  from 'lodash/throttle';
import debounce from 'lodash/debounce';
class RevealOnScroll{
    constructor(els, thresholdPercent){
        /*this.itemToReveal = document.querySelectorAll(".features__item");*/
        this.thresholdPercent = thresholdPercent;
        this.itemToReveal = els;
        this.hideInitially();
        this.browserHeight = window.innerHeight;
        this.scrollthrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events(){
        window.addEventListener("scroll", this.scrollthrottle);
        window.addEventListener("resize", debounce( ()=> {this.browserHeight = window.innerHeight;}, 350));
    }

    calcCaller(){
        this.itemToReveal.forEach( el => {
            if (el.isRevealed == false){
                this.calculateIfScrolledTo(el);
            }
        })
    }

    calculateIfScrolledTo(el){
        if ( window.scrollY + this.browserHeight > el.offsetTop){
            let scrollPercent  = (el.getBoundingClientRect().y / window.innerHeight) * 100;
            if(scrollPercent<this.thresholdPercent){
                el.classList.add("reveal-item__is-visible");
                el.isRevealed= true;
                if(el.isLastItem){
                    window.removeEventListener('scroll', this.scrollthrottle)
                }
        }}
    }

    hideInitially(){
        this.itemToReveal.forEach( el =>{ 
            el.classList.add("reveal-item");
            el.isRevealed= false;
        });
        this.itemToReveal[this.itemToReveal.length - 1].isLastItem = true;
    }
}

export default RevealOnScroll;