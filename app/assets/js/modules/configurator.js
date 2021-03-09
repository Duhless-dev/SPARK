function configurator(){
    const dbState = JSON.parse(localStorage.getItem('config')) || {
        body:{
            trigger : false,
            img:'',
            price:0,
            title:'',
        },
        video:{
            trigger: false,
            img:'',
            price:0,
            title:'',
        },
        proc:{
            trigger: false,
            img:'',
            price:0,
            title:'',
        },
        mat:{
            trigger: false,
            img:'',
            price:0,
            title:'',
        },
        ram:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
            quantity: 1,
        },
        ssd:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        ssd2:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        hdd:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        energy:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        cool:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        sound:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        dvd:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        wifi:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        },
        os:{
            trigger: false,
            img:'',
            price: 0,
            title:'',
        }
    };
    // console.log(dbState);
    try {
      const linkButton = document.querySelector('#config__inner');
        
        linkButton.addEventListener('click',()=>{
            dbState.body.img = `${linkButton.getAttribute('data-bodyimg')}`;
            dbState.body.trigger = true;
            dbState.body.price = +linkButton.getAttribute('data-bodyprice');
            dbState.body.title =`${linkButton.getAttribute('data-bodytitle').replace(/\|/g,' ')}`;
            dbState.video.img = `${linkButton.getAttribute('data-videoimg')}`;
            dbState.video.trigger = true;
            dbState.video.price = +linkButton.getAttribute('data-videoprice');
            dbState.video.title =`${linkButton.getAttribute('data-videotitle').replace(/\|/g,' ')}`;
            dbState.proc.img = `${linkButton.getAttribute('data-procimg')}`;
            dbState.proc.trigger = true;
            dbState.proc.price = +linkButton.getAttribute('data-procprice');
            dbState.proc.title =`${linkButton.getAttribute('data-proctitle').replace(/\|/g,' ')}`;
            dbState.mat.img = `${linkButton.getAttribute('data-matimg')}`;
            dbState.mat.trigger = true;
            dbState.mat.price = +linkButton.getAttribute('data-matprice');
            dbState.mat.title =`${linkButton.getAttribute('data-mattitle').replace(/\|/g,' ')}`;
            dbState.ram.img = `${linkButton.getAttribute('data-ramimg')}`;
            dbState.ram.trigger = true;
            dbState.ram.price = +linkButton.getAttribute('data-ramprice') * +`${linkButton.getAttribute('data-ramquant')}`;
            dbState.ram.title =`${linkButton.getAttribute('data-ramtitle').replace(/\|/g,' ')}`;
            dbState.ram.quantity = +`${linkButton.getAttribute('data-ramquant')}`;
            dbState.energy.trigger = true;
            dbState.energy.img = `${linkButton.getAttribute('data-energyimg')}`;
            dbState.energy.price = +linkButton.getAttribute('data-energyprice');
            dbState.energy.title =`${linkButton.getAttribute('data-energytitle').replace(/\|/g,' ')}`;
            if (linkButton.getAttribute('data-ssdtitle')!='') {
                dbState.ssd.img = `${linkButton.getAttribute('data-ssdimg')}`;
                dbState.ssd.trigger = true;
                dbState.ssd.price = +linkButton.getAttribute('data-ssdprice');
                dbState.ssd.title =`${linkButton.getAttribute('data-ssdtitle').replace(/\|/g,' ')}`;     
            }
            if (linkButton.getAttribute('data-hddtitle')!='') {
                dbState.hdd.img = `${linkButton.getAttribute('data-hddimg')}`;
                dbState.hdd.trigger = true;
                dbState.hdd.price = +linkButton.getAttribute('data-hddprice');
                dbState.hdd.title =`${linkButton.getAttribute('data-hddtitle').replace(/\|/g,' ')}`;     
            }
            localStorage.setItem('config', JSON.stringify(dbState));
        });
    }catch (e) {
        console.log('config-1');
    }

    try {
    const topicWrapper  = document.querySelectorAll('.configurator__content-item'),
    configPreview = document.querySelector('.config-result__preview'),
    configPrice = document.querySelector('.config-result__price span'),
    totalConfigItems = document.querySelectorAll('.config-result__total-item p'),
    configCrash = document.querySelector('.config-result__crash img'),
    buttonCart = document.querySelector('.products-button button'),
    totalCart = document.querySelector('.configurator__result');

    function deleteCheceked (CheckList){
        CheckList.forEach((cell)=>{
            const check = cell.querySelector('.checkbox-config');
            check.checked = false;
        });
    }

    function changeState(e, callback) {
        const configItem = e.target.closest('.content-list__item'),
        configTopic = e.target.closest('.configurator__content-item').getAttribute('id');
        dbState[configTopic].trigger = true;
        dbState[configTopic].img = configItem.getAttribute('data-img');
        dbState[configTopic].title = configItem.getAttribute('data-name').replace(/\|/g,' ');
        if (dbState[configTopic].quantity){
            dbState[configTopic].price = +configItem.getAttribute('data-price') * dbState[configTopic].quantity;
        }else{
            dbState[configTopic].price = +configItem.getAttribute('data-price');
        }
        callback();
    }

    function deleteStateitem(e, callback){
        const configTopic = e.target.closest('.configurator__content-item').getAttribute('id');
        dbState[configTopic].trigger = false;
        dbState[configTopic].img = '';
        dbState[configTopic].price = 0;
        dbState[configTopic].title = '';
        if (dbState[configTopic].quantity){
            dbState[configTopic].quantity = 1;
        }
        callback();
    }
    function deleteState(callback){
        for(let key in dbState){
            dbState[key].trigger = false;
            dbState[key].price = 0;
            dbState[key].title = '';
            dbState[key].img = '';
            if (dbState[key].quantity){
                dbState[key].quantity = 1;
            }
        }
        callback();
    }

    function calcPrice(a, b){
        if(a > b){
            return `- ${a - b} Р`;
        }else if(b >= a){
            return `+ ${b - a} Р`;
        }
    }

    function totalPrice(){
        let total = 0;
        for(let key in dbState){
            if(dbState[key].trigger){
                total += dbState[key].price;
            }
        }
        return total;
    }

    function totalConfig(){
        totalConfigItems.forEach((item)=>{
            const itemId = item.closest('.config-result__total-item').getAttribute('data-id');
            if(dbState[itemId].trigger){
                item.textContent = dbState[itemId].title;
            }else{
                item.textContent = 'Не выбрано';
            }
            
        });

        for (let key in dbState){
            if (dbState[key].trigger){
                totalCart.setAttribute(`data-${key}`, dbState[key].title);
            }else{
                totalCart.setAttribute(`data-${key}`, 'Не выбрано');
            }
            
        }
        totalCart.setAttribute('data-ramQuant', dbState.ram.quantity);
        totalCart.setAttribute('data-img', dbState.body.img);
        totalCart.setAttribute('data-name', dbState.body.title);
        totalCart.setAttribute('data-price', totalPrice());
    }

    function triggerCalc(item, cell, display){
        if (item.getAttribute('data-calc')){
            const configCalcResult = cell.querySelector('.config-calc-result');
            configCalcResult.textContent = dbState[item.getAttribute('id')].quantity;
            configCalcResult.closest('.config-calc').style.display = display;
        }
    }

    function calcDecrease(e, callback){
        const calcWrapper = e.target.closest('.configurator__content-item').getAttribute('id');
        if (dbState[calcWrapper].quantity > 1) {
            dbState[calcWrapper].quantity-=1;
            callback(e, renderState);
        } 
    }
    function calcIncrease(e, callback){
        const calcWrapper = e.target.closest('.configurator__content-item').getAttribute('id');
        if (dbState[calcWrapper].quantity < 4) {
            dbState[calcWrapper].quantity+=1;
            callback(e, renderState);
        } 
    }

    function renderState(){
        topicWrapper.forEach((item)=>{
            const topicItems = item.querySelectorAll('.content-list__item'),
            topicResult = item.querySelector('.config-tabs__content-result'),
            topicWrapperId = item.getAttribute('id');
            topicItems.forEach((cell)=>{
                const checkSelector = cell.querySelector('.checkbox-config'),
                checkDiffer = cell.querySelector('.config-differ');
               
                if (cell.getAttribute('data-name').replace(/\|/g,' ') == dbState[topicWrapperId].title){
                    checkSelector.checked = true;
                    checkDiffer.style.display = 'none';
                    topicResult.style.backgroundImage = `url(${dbState[topicWrapperId].img})`;

                    if (topicWrapperId == "body"){
                        configPreview.style.backgroundImage = `url(${dbState[topicWrapperId].img}`;
                    }
                    triggerCalc(item, cell, 'flex');
                }else{
                    if(dbState[topicWrapperId].trigger){
                        checkDiffer.style.display = "block";
                        if(dbState[topicWrapperId].quantity){
                            checkDiffer.textContent = calcPrice(dbState[topicWrapperId].price, +cell.getAttribute('data-price')*dbState[topicWrapperId].quantity);
                        }else{
                            checkDiffer.textContent = calcPrice(dbState[topicWrapperId].price, +cell.getAttribute('data-price'));
                        }
                        triggerCalc(item, cell, 'none');
                    }else{
                        checkSelector.checked = false;
                        checkDiffer.style.display = "none";
                        topicResult.style.backgroundImage = `url(${dbState[topicWrapperId].img})`; 
                        if (topicWrapperId == "body"){
                            configPreview.style.backgroundImage = `url(${configPreview.getAttribute('data-preview')})`;
                        }
                        triggerCalc(item, cell, 'none');
                    }
                }
            });

        });
        configPrice.textContent = totalPrice();
        totalConfig();
        if (dbState.body.trigger && dbState.mat.trigger && dbState.proc.trigger && dbState.ram.trigger && dbState.video.trigger){
            totalCart.classList.add('product-card');
            buttonCart.classList.add('triggerConfigButton');

        }else{
            totalCart.classList.remove('product-card');
            buttonCart.classList.remove('triggerConfigButton');
        }
        localStorage.setItem('config', JSON.stringify(dbState));
    }


    topicWrapper.forEach((item)=>{
        const topicItems = item.querySelectorAll('.content-list__item');
        topicItems.forEach((cell)=>{
            const checkSelector = cell.querySelector('.checkbox-config');
            checkSelector.addEventListener('change',(e)=>{
                if (e.target.checked) {
                    deleteCheceked (topicItems);
                    changeState(e, renderState);
                }else{
                    deleteCheceked (topicItems);
                    deleteStateitem(e, renderState);
                }
            });
            if (item.getAttribute('data-calc')){
                const configCalcPlus = cell.querySelector('.config-calc-plus'),
                configCalcMinus = cell.querySelector('.config-calc-minus');
                configCalcPlus.addEventListener('click',(e)=>{
                    calcIncrease(e, changeState);
                });
                configCalcMinus.addEventListener('click',(e)=>{
                    calcDecrease(e, changeState);
                });
            }
        });
    });

    configCrash.addEventListener('click',()=>{
        deleteState(renderState);
    });

    buttonCart.addEventListener('click',()=>{
        if (dbState.body.trigger && dbState.mat.trigger && dbState.proc.trigger && dbState.ram.trigger && dbState.video.trigger){
            totalCart.classList.add('product-card');
            buttonCart.classList.add('triggerConfigButton');
        }else{
            totalCart.classList.remove('product-card');
            buttonCart.classList.remove('triggerConfigButton');
            alert('Для добавления в корзину, выберете Видеокарту, Процессор, Корпус, Материнскую плату и Оперативную память');
        }
    });
    renderState();
    } catch (error) {
            console.log('config-2');  
    }

}

export {configurator};