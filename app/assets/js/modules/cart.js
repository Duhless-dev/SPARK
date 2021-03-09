
// import 'just-validate';
// import { for } from 'core-js/fn/symbol';
import {maskTel} from '../services/service';
import {validateForms} from '../services/service';
function cart(){
    const dataMas = JSON.parse(localStorage.getItem('cart')) || {};
    const cartDOMElement = document.querySelector('.pop-cart');
    
    function cartInit(){
        maskTel('input[type = "tel"]');
        updateCart(dataMas);
        document.querySelector("body").addEventListener("click", (e)=>{   
            let specification = {};  
            if (e.target.classList.contains("products-item__button-cart") || e.target.classList.contains('triggerConfigButton')){
                e.preventDefault();
                if (e.target.classList.contains('triggerConfigButton')){
                    // console.log(e.target);
                    let specSelector = e.target.closest('.configurator__result') || e.target.closest('.products-item') || e.target.closest('.product-card');
                    specification.body = specSelector.getAttribute('data-body');
                    specification.video = specSelector.getAttribute('data-video');
                    specification.proc = specSelector.getAttribute('data-proc');
                    specification.mat = specSelector.getAttribute('data-mat');
                    specification.ram  = specSelector.getAttribute('data-ram');
                    specification.ramQuant = specSelector.getAttribute('data-ramQuant');
                    specification.ssd = specSelector.getAttribute('data-ssd');
                    specification.ssd2 = specSelector.getAttribute('data-ssd2');
                    specification.hdd = specSelector.getAttribute('data-hdd');
                    specification.energy = specSelector.getAttribute('data-energy');
                    specification.cool = specSelector.getAttribute('data-cool');
                    specification.wifi = specSelector.getAttribute('data-wifi');
                    specification.dvd = specSelector.getAttribute('data-dvd');
                    specification.sound = specSelector.getAttribute('data-sound');
                    specification.os = specSelector.getAttribute('data-os');
                }
                const productItemDomElemnt = e.target.closest(".products-item") || e.target.closest(".product-card");
                productItemDomElemnt.setAttribute("data-id",productItemDomElemnt.getAttribute("data-name"));
                const dataCartItem ={ 
                    img : productItemDomElemnt.getAttribute("data-img"),
                    name: productItemDomElemnt.getAttribute("data-name"),
                    price: +productItemDomElemnt.getAttribute("data-price").replace(/ /g,""),
                    id: productItemDomElemnt.getAttribute("data-id"),
                    link: productItemDomElemnt.getAttribute("data-link"),
                    quantity: 1,
                    dataSpecification: specification 
                };
                    if (dataMas[dataCartItem.id]) {
                    increaseQuantity(dataMas, dataCartItem.id);
                    return;
                    }
                    let {id} = dataCartItem;
                    dataMas[id] = dataCartItem; 
                    updateCart(dataMas);
                }
            if (e.target.classList.contains("pop-cart__btn-plus")){
                e.preventDefault();
                const productItemDomElemnt = e.target.closest(".pop-cart__item");
                const item = productItemDomElemnt.getAttribute("data-id");
                increaseQuantity(dataMas, item);
            }
            if (e.target.classList.contains("pop-cart__btn-minus")){
                e.preventDefault();
              const productItemDomElemnt = e.target.closest(".pop-cart__item");
              const item = productItemDomElemnt.getAttribute("data-id");
              decreaseQuantity(dataMas, item);
            }
            if (e.target.classList.contains("pop-cart__item-close")){
                e.preventDefault();
                const productItemDomElemnt = e.target.closest(".pop-cart__item");
                const item = productItemDomElemnt.getAttribute("data-id");
                deleteCart(dataMas, item);
            }
            
            if (e.target.closest(".modal-universal__close") || e.target.closest('.pop-cart__wrapper')){
                cartDOMElement.querySelector('.thanks-popup').style.display = "none";
            }
        });
    }

    class Product{
        constructor(img, name, price, id, link, quantity, dataSpecification){
            this.quantity = quantity;
            this.img = img;
            this.name = name;
            this.price = price * quantity;
            this.id = id;
            this.link = link;
            this.specification = dataSpecification;
        }
        createCard(){
           const div  = document.createElement('div');
           div.classList.add("pop-cart__item");
           div.setAttribute("data-id", this.id);
           div.setAttribute("data-price", this.price);
           let objLength = 0;
           for (let key in this.specification){
               objLength += 1;
           }
           if (objLength != 0){
            div.innerHTML = `
            <div class="pop-cart__info">
                 <a href = "${this.link}" class="pop-cart__info-img" style="background-image: url(${this.img});"></a>
                 <a href = "${this.link}" class="pop-cart__info-descr">${this.name}</a>
             </div>
             
             <div class="pop-cart__quant">
                     <div class="pop-cart__quant-wrapper">
                         <span>${this.quantity}</span>
                         <button class="pop-cart__btn-plus">+</button>
                         <button class="pop-cart__btn-minus">-</button>
                     </div>
             </div>
             <div class="pop-cart__price">
                 <h5><span>${this.price}</span>Р</h5>
                 <p> <span>${this.price / this.quantity}</span> р за штуку</p>
             </div>
             <button class="pop-cart__item-close"></button>
            `;
           }else{
            div.innerHTML = `
            <div class="pop-cart__info">
                 <a href = "${this.link}" class="pop-cart__info-img" style="background-image: url(${this.img});"></a>
                 <a href = "${this.link}" class="pop-cart__info-descr">${this.name}</a>
             </div>
             <div class="pop-cart__quant">
                     <div class="pop-cart__quant-wrapper">
                         <span>${this.quantity}</span>
                         <button class="pop-cart__btn-plus">+</button>
                         <button class="pop-cart__btn-minus">-</button>
                     </div>
             </div>
             <div class="pop-cart__price">
                 <h5><span>${this.price}</span>Р</h5>
                 <p> <span>${this.price / this.quantity}</span> р за штуку</p>
             </div>
             <button class="pop-cart__item-close"></button>
            `;
           }

           return(div);
        }
        addCart(){
            cartDOMElement.querySelector(".pop-cart__items").append(this.createCard());
        }

    }

    function updateCart(dataMas){
        if(totalCartQuantity(dataMas)!= 0){
            cartDOMElement.querySelector(".pop-cart__content").style.display = "block";
            document.querySelector(".cart-plug").style.display = "none";
            const cartTotalQuantityDomElement = cartDOMElement.querySelector(".pop-cart__result-products span"),
            cartTotalPriceDomElement = cartDOMElement.querySelector(".pop-cart__result-total span");
            cartDOMElement.querySelector(".pop-cart__items").innerHTML = "";
            
            for (let item in dataMas){
                let {img, name, price, id, link, quantity, dataSpecification} = dataMas[item];
                const cartProductItem = new Product(img, name, price, id, link, quantity, dataSpecification);
                cartProductItem.createCard();
                cartProductItem.addCart();
            }

            cartTotalQuantityDomElement.textContent = totalCartQuantity(dataMas);
            document.querySelector(".cart-counter").textContent = totalCartQuantity(dataMas);
            cartTotalPriceDomElement.textContent = totalCartPrice(dataMas);
        }else{
            document.querySelector(".cart-counter").textContent = 0;
            cartDOMElement.querySelector(".pop-cart__content").style.display = "none";
            document.querySelector(".cart-plug").style.display = "block";
        }
        // console.log(dataMas);
        localStorage.setItem('cart', JSON.stringify(dataMas));
    }
    
    function totalCartQuantity(dataMas){
        const totalQuantity = Object.keys(dataMas).reduce((summ, id) =>{
            const { quantity } = dataMas[id];
            summ+= quantity;
            return summ;
        },0);
        return totalQuantity;  
    }
    function totalCartPrice(dataMas){
        const totalPrice = Object.keys(dataMas).reduce((summ, id) =>{
            const { price, quantity } = dataMas[id];
            summ+= price*quantity;
            return summ;
        },0);
        return totalPrice;  
    }

    function increaseQuantity(dataMas,item){
        let count = dataMas[item].quantity;
                count+=1;
                dataMas[item].quantity=count;
                updateCart(dataMas);
    }
    
    function decreaseQuantity(dataMas, item){
        
        let count = dataMas[item].quantity;
            count-=1;
            if(count>=1){
                dataMas[item].quantity=count;
                updateCart(dataMas); 
            }
                
    }

    function deleteCart(dataMas, item){
        delete dataMas[item];
        updateCart(dataMas);
    }
    cartInit();
    validateForms('.pop-cart__content', { name: {required: true}, tel: {required: true} }, '.test', 'send goal' , dataMas, updateCart);

}

export {cart};