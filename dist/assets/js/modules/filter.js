const filterCategoryes = document.querySelectorAll('.katalog-filterButton__item-button');
	const allFilter = document.querySelector(".katalog-filterButton__all button");
	const filterItems = document.querySelectorAll(".products-item");
	let trigger = true;
	let proc = "",
	video = "",
	ram = "",
	ssd = "";


function btnAllfilter(){
    proc = "";
	video = "";
	ram = "";
	ssd = "";
    filterCategoryes.forEach((item)=>{
        item.setAttribute("data-toggle","");
        item.querySelectorAll("button").forEach((btn)=>{
            btn.classList.remove("filter__btn--active");
        });
    });
    allFilter.classList.add("filter__btn--active");
    filterShow("","","","");
}

function filterShow(proc, video, ram, ssd){
        const count =[];
        let i = 0;
        filterItems.forEach((item)=>{
            if ((item.classList.contains(proc) || proc=="") && (item.classList.contains(video) || video=="") &&(item.classList.contains(ram) || ram =="") && (item.classList.contains(ssd) || ssd =="")){
                count[i] = i;	
            }else{
                count[i]='*';
            }
            i+=1;
        });
        i=0;			
        filterItems.forEach((item)=>{
            item.classList.remove("visible");
            item.classList.add("anim");
            item.ontransitionend = function(){
            item.classList.add("hide");
                itemBlock(count);
            };
            if (trigger){
                
            }else{
                itemBlock(count);
            }
        });	
        
        let strTrigger = count.join('');
        const patr = /\d/;
        if ((patr.test(strTrigger))){	
            trigger = true;
        }else{
            trigger = false;	
        }
}

function itemBlock(count){		
    let i=0;
    count.forEach((it)=>{
        if(filterItems[it] == filterItems[i]){
            filterItems[i].classList.remove("anim");
            filterItems[i].classList.remove("hide");
            filterItems[i].classList.add("visible");
        }else{
            
        }
        i+=1;
    });
}	

function switchFilter(item, result){
    switch(item) {
        case filterCategoryes[0]:
            proc = result;
            break;
        case filterCategoryes[1]:
            video = result;
            break;
        case filterCategoryes[2]:
            ram = result;
            break;
        case filterCategoryes[3]:
            ssd = result;
            break;
    }
}
function btnFilterComputers(item, buttons, btn){
    btn.addEventListener("click",(e)=>{
            allFilter.classList.remove("filter__btn--active");
            if (e.target.classList.contains("filter__btn--active")){
                e.target.classList.remove("filter__btn--active");
                switchFilter(item,"");
                if (proc == "" && video == "" && ram =="" && ssd == ""){
                    btnAllfilter();
                }else{
                    filterShow(proc, video, ram, ssd);
                }
            }else{
                buttons.forEach((i)=>{
                    i.classList.remove("filter__btn--active");
                });
                e.target.classList.add("filter__btn--active");
                switchFilter(item, e.target.getAttribute("data-btn"));
                filterShow(proc, video, ram, ssd);	
            }
    });
}

function btnFilterPerif(btn){
    btn.addEventListener("click",(e)=>{
        if (e.target.classList.contains("filter-perif")){
            allFilter.classList.remove("filter__btn--active");
            if (e.target.classList.contains("filter__btn--active")){
                btnAllfilter();	
            }else{
                filterCategoryes.forEach((item)=>{
                    const but = item.querySelector("button");
                    but.classList.remove("filter__btn--active");
                });
                e.target.classList.add("filter__btn--active");
                proc = e.target.getAttribute("data-btn");
                video = "";
                ram="";
                ssd = "";
                filterShow(proc, video, ram, ssd);	
            }	
        }
    });
}
function makeFilterButton(){
    filterCategoryes.forEach((item)=>{
        const buttons = item.querySelectorAll("button");
        buttons.forEach((btn)=>{
            if(btn.classList.contains("filter-perif")){
                btnFilterPerif(item, btn);
            }else{
                btnFilterComputers(item, buttons, btn);	
            }
        });
    });
    allFilter.addEventListener('click',()=>{
        btnAllfilter();
    });
}
export{makeFilterButton};