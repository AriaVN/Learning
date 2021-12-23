class MobileMenu{
    constructor(){
        /*document.querySelector(".site-header__menu-icon").addEventListener("click", function(){
            //alert('menu icon has been clicked!!!');
        });*/
        this.menuIcon = document.querySelector(".site-header__menu-icon");
        this.menuContent = document.querySelector(".site-header__menu-content");
        this.menuHeader = document.querySelector(".site-header");
        this.events();
    }
    /*
    events(){
        this.menuIcon.addEventListener("click", toggleTheMenu());
    }
    */
    events(){
        this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
    }


    toggleTheMenu(){
        //alert('menu icon has been clicked!!!');
        this.menuContent.classList.toggle("site-header__menu-content--is-visible");
        this.menuHeader.classList.toggle("site-header__is-expanded");
        this.menuIcon.classList.toggle("site-header__menu-icon-close-x")
    }
}

export default MobileMenu;