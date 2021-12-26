import'../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

let mobileMenu = new MobileMenu();
let stickyHeader = new StickyHeader();
/*let revealOnScroll = new RevealOnScroll();*/
new RevealOnScroll(document.querySelectorAll(".features__item"), 85);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 75);

if(mudole.hot){
    mudole.hot.accept();
}

