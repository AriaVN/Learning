import'../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
let modal
let mobileMenu = new MobileMenu();
let stickyHeader = new StickyHeader();
/*let revealOnScroll = new RevealOnScroll();*/
new RevealOnScroll(document.querySelectorAll(".features__item"), 85);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 75);

document.querySelectorAll(".open-modal").forEach(el=> {
    el.addEventListener("click", e=> {
        e.preventDefault();
        if(typeof modal=="undefined"){
            import (/*webpackChunckName: "modal"*/'./modules/Modal').then(x=>{
                modal = new x.default();
                setTimeout(()=> modal.openTheModal(),20)
            }).catch(()=>{
                console.log("there was a problem.");
            });
        }
        else{
            modal.openTheModal();
        }
    })
})

if(mudole.hot){
    mudole.hot.accept();
}

