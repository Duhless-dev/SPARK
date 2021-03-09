    function FPS(){
        const fpsValue = document.querySelectorAll(".fps-value");
    
        fpsValue.forEach((item)=>{
            let fpsPosition = Math.trunc(+item.getAttribute("data-position")/250 * 100);
            item.style.left = `${fpsPosition}%`;
    
        });
    }
    
    function tabs(tabsSelector, tabsBtnSelector, tabsParrentSelector, tabActiveSelector, triggerTabs = true){
       
    
        function hideTabs(nowTabs, nowTabBtn){
            nowTabs.forEach ((item, i) => {
                if(triggerTabs){
                    item.style.height = "0px";
                    item.style.overflow =  "hidden";
                    item.style.padding = "0";
                    nowTabBtn[i].classList.remove(tabActiveSelector.slice(1));
                }else{
                    item.style.display = "none";
                    nowTabBtn.forEach((it)=>{
                        it.classList.remove(tabActiveSelector.slice(1));
                    });
                }
                
            });
        }
        function addTabs(nowTabs,nowTabBtn,i = 0){
            if(triggerTabs){
                nowTabs[i].style.height = "auto";
                nowTabs[i].style.padding = "60px 0";
                nowTabs[i].style.overflowY =  "visible"; 
                nowTabBtn[i].classList.add(tabActiveSelector.slice(1));
            }else{
                nowTabBtn[i].classList.add(tabActiveSelector.slice(1));
                nowTabs.forEach((item)=>{
                    if(item.getAttribute('data-id').toUpperCase() == nowTabBtn[i].getAttribute('data-id').toUpperCase()){
                        item.style.display = "block";
                    }
                });
            }
           
        }
        function addTabsALL(nowTabs,nowTabBtn){
            nowTabs.forEach((item)=>{
                item.style.display = "block";
            });
            nowTabBtn[0].classList.add(tabActiveSelector.slice(1));
        }

        function addEvent(nowTabBtnContainer, nowTabs, nowTabBtn){
            nowTabBtnContainer.forEach((item)=>{
                item.addEventListener('click', (e)=>{
                    if(triggerTabs){
                       if (e.target && e.target.closest(tabsBtnSelector)){
                        nowTabBtn.forEach((item,i) => {
                            if (e.target == item){
                                hideTabs(nowTabs, nowTabBtn);
                                addTabs(nowTabs, nowTabBtn,i);
                            }
                        });
                        } 
                    }else{
                        if (e.target && e.target.closest(tabsBtnSelector) && !e.target.closest('.config-tabs__btn-all')){
                            nowTabBtn.forEach((item,i) => {
                                if (e.target.getAttribute('data-id') == item.getAttribute('data-id')){
                                    hideTabs(nowTabs, nowTabBtn);
                                    addTabs(nowTabs, nowTabBtn,i);
                                }
                            });
                        }else if (e.target.closest('.config-tabs__btn-all')){
                            hideTabs(nowTabs, nowTabBtn);
                            addTabsALL(nowTabs,nowTabBtn);
                        }
                    }
                    
                });   
            });
        }
    
        if(triggerTabs){
            const tabs = document.querySelectorAll(tabsSelector),
            tabBtn = document.querySelectorAll(tabsBtnSelector),
            tabBtnContainer = document.querySelectorAll(tabsParrentSelector);
            hideTabs(tabs, tabBtn);
            addTabs(tabs,tabBtn);
            addEvent(tabBtnContainer, tabs, tabBtn);
        }else{
            const 
            parrentTabs = document.querySelectorAll('.configurator__content-item');
            parrentTabs.forEach((item)=>{
                const tabs = item.querySelectorAll(tabsSelector),
                tabBtn = item.querySelectorAll(tabsBtnSelector),
                tabBtnContainer  = item.querySelectorAll(tabsParrentSelector);
                hideTabs(tabs, tabBtn);
                addTabsALL(tabs, tabBtn);
                addEvent(tabBtnContainer, tabs, tabBtn);
            });
        }
     
    }

export {FPS};
export{tabs};