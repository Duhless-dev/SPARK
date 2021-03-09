function scrollConfig (){
const btnScroll = document.querySelectorAll('.configurator__table-item'),
contentScroll = document.querySelectorAll('.configurator__content-item'),
wrapperScroll = document.querySelector('.simplebar-content-wrapper');

let speed = 1;

function moveElement(elem){
    let 
    koordWin = wrapperScroll.getBoundingClientRect().top - 150,
    koordBlock = elem.getBoundingClientRect().top - 150;
    let start = null,
    startWin = null, 
    toBlock = koordBlock - koordWin,
    widthTop = wrapperScroll.scrollTop;

    let winTop = document.body.scrollTop,
    winSelector = document.body,
    winBlock = koordBlock,
    winScrollBottom = wrapperScroll.scrollHeight - wrapperScroll.scrollTop - wrapperScroll.
    clientHeight;
    
  
        if ((wrapperScroll.clientHeight == (wrapperScroll.scrollHeight-wrapperScroll.scrollTop)   )&& (toBlock >= 0)){
            requestAnimationFrame(win);
        }else if((toBlock <= winScrollBottom)){
                winBlock = koordWin;
                requestAnimationFrame(win);
                requestAnimationFrame(step); 
            }else if(koordWin>=0 && koordWin<15){
                winBlock = koordBlock - winScrollBottom;
                requestAnimationFrame(win);
                requestAnimationFrame(step); 
            }else{
                winBlock = koordWin+toBlock - winScrollBottom;
                requestAnimationFrame(win);
                requestAnimationFrame(step);
            }
                

        
    

    function step(time) {
        if (start === null) {
            start = time;
        }
        let progress = time - start,

 
            r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
            wrapperScroll.scrollTo(0, r);


        if ((r != widthTop + toBlock)){
            requestAnimationFrame(step); 
        }else{
            // winBlock = elem.getBoundingClientRect().top;
            // requestAnimationFrame(win);
        }
    }

    

    function win(time) {
        if (startWin === null) {
            startWin = time;
        }
        let progress = time - startWin;

            let t = (winBlock < 0 ? Math.max(winTop - progress/speed, winTop + winBlock) : Math.min(winTop + progress/speed, winTop + winBlock));
                winSelector.scrollTo(0, t);

        if (((t != winTop + winBlock))){
            requestAnimationFrame(win);    
        }else{
        }
    }
}
// && (elem.getBoundingClientRect().top > 150


    btnScroll.forEach((item)=>{
        item.addEventListener('click',(e)=>{  
            e.preventDefault();      
            btnScroll.forEach(btn=> btn.classList.remove('config-btn__active'));
            e.target.closest('.configurator__table-item').classList.add('config-btn__active');
            let link = e.target.closest('.configurator__table-item'),
            hash = link.hash,
            elem = null;
            contentScroll.forEach((cont)=>{
                if(cont.getAttribute('id') == hash.replace(/#/g,'')){
                    elem = cont;          
                }
            });
            if (elem){
                moveElement(elem);
            }
            
        });
    });
}

export{scrollConfig};