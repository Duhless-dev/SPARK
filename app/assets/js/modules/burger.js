function burger(){
    const burger = document.querySelector(".header__burger"),
    menu = document.querySelector(".header__menu");
    burger.addEventListener("click",()=>{
        burger.classList.toggle("header__burger-active");
        menu.classList.toggle("header__menu-active");
    });

    try{
    const filterBurger = document.querySelector(".filter__burger"),
        filterInner = document.querySelector(".katalog-filterButton__inner"),
        filterClose = filterInner.querySelector(".modal-universal__close");

        filterBurger.addEventListener("click",()=>{
            filterBurger.classList.add("filter__btn--active");
            filterInner.style.transform= "translateY(0)";
        });
        filterClose.addEventListener("click",()=>{
            filterBurger.classList.remove("filter__btn--active");
            filterInner.style.transform= "translateY(-200%)";
        });
    }
    catch(e){

    }
}
export {burger};