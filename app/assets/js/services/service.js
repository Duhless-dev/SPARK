import Inputmask from "inputmask";
import 'just-validate/dist/js/just-validate.min.js';


function calcHeight(selector1, selector2, triggerWindow = 0){
    const trigger = document.querySelector(selector1),
    content = document.querySelector(selector2);

    calc();

    window.onresize = function() {
        calc();
    };

    function calc(){
        if (document.documentElement.scrollWidth > triggerWindow){
            content.style.height = window.getComputedStyle(trigger).height;
        }else{
            content.style.height = "100%"; 
        }
        
        
    }
}

function modalCreate(selectorContent, selectorData, target){
    const triggerParrent = target.closest(selectorData),
    modal = document.querySelector(selectorContent),
    dbState={};
    dbState.img = triggerParrent.getAttribute('data-img');
    dbState.title = triggerParrent.getAttribute('data-name');
    dbState.info = triggerParrent.getAttribute('data-info');
    let title = [], info = [];
    title = dbState.title.split('|');
    info = dbState.info.split(';');

    function createInfo(){
        let infoContent = '';
        info.forEach((item)=>{
            let it=[];
            it = item.split(':');
            infoContent+=` <div class="modal-config__descr-item">
            <span>${it[0]}:</span>
            <p>${it[1]}</p>
             </div>`;   
        });
        return(infoContent);
    }
    modal.innerHTML = `
        <div class="modal-config__img" style = "background-image: url(${dbState.img});">
        </div>
        <div class="modal-config__descr">
            <div class="modal-config__descr-title">
                <h4 class="page-title">${title[0]}<span>${title[1]}</span></h4>
            </div>
            ${createInfo()}
        </div
    `;
}

function maskTel(selectorInput){
    let selectorTel = document.querySelectorAll(selectorInput);
    let im =  new Inputmask('+7 (999) 999-99-99');
    im.mask(selectorTel);
}


function validateForms(selector, rules, successModal, yaGoal, dataMas, callback) {
	new window.JustValidate(selector, {
		rules: rules,
        messages: {
            name: 'Поле не заполнено',
            tel: 'Поле не заполнено'
          },
		submitHandler: function(form) {
			let formData = new FormData(form);
            formData.append('Товары', JSON.stringify(dataMas));
			fetch("mail.php", {
                method: "POST",
                body: formData
            })
            .then(function(data) {
                document.querySelector('.thanks-popup').style.display = "flex";

                    for (let item in dataMas) {
                        delete dataMas[item];

                    callback(dataMas);
                    localStorage.setItem('cart', JSON.stringify(dataMas));
                }
                form.reset();
            });

			form.reset();
		}
	});
}


export {calcHeight};
export {modalCreate};
export {maskTel};
export {validateForms};