import {modalCreate} from "../services/service";

function modal(selector, selectorClose, selectorBtn, selectorInner, selectorContent ="",selectorData = "",triggerCreate = false){
    const modalWin = document.querySelector(selector),
    modalClose = modalWin.querySelector(selectorClose),
    modalBtn = document.querySelectorAll(selectorBtn);

    modalBtn.forEach(item => {
        item.addEventListener("click",(e)=>{
            if (triggerCreate){
                modalCreate(selectorContent, selectorData, e.target);
                modalWin.style.display = "block";
                document.body.style.overflow = "hidden";
            }else{
                modalWin.style.display = "block";
                document.body.style.overflow = "hidden";
            } 
        });
    });
    modalWin.addEventListener("click",(e)=>{
        if(e.target == modalClose || !e.target.closest(selectorInner)){
            modalWin.style.display = "none";
            document.body.style.overflow = "";
        }
    });
}
export {modal};