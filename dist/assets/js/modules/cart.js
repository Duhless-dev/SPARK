import Inputmask from "inputmask";
import 'just-validate';

function cart(){
    const dataMas = JSON.parse(localStorage.getItem('cart')) || {};
    let specification = '';
    const cartDOMElement = document.querySelector('.pop-cart');
    function cartInit(){
        updateCart(dataMas);
        document.querySelector("body").addEventListener("click", (e)=>{     
            if (e.target.classList.contains("products-item__button-cart") || e.target.classList.contains('triggerConfigButton')){
                e.preventDefault();
                if (e.target.classList.contains('triggerConfigButton')){
                    let specSelector = e.target.closest('.configurator__result');
                    specification = specSelector.getAttribute('data-body') + ' ' + specSelector.getAttribute('data-video') +' ' + specSelector.getAttribute('data-proc') + ' '+ specSelector.getAttribute('data-mat')+ ' '+ specSelector.getAttribute('data-ram') +' '+specSelector.getAttribute('data-ramQuant');
                }
                const productItemDomElemnt = e.target.closest(".products-item") || e.target.closest(".product-card");
                productItemDomElemnt.setAttribute("data-id",productItemDomElemnt.getAttribute("data-name"));
                const dataCartItem ={ 
                    img : productItemDomElemnt.getAttribute("data-img"),
                    name: productItemDomElemnt.getAttribute("data-name"),
                    price: +productItemDomElemnt.getAttribute("data-price").replace(/ /g,""),
                    id: productItemDomElemnt.getAttribute("data-id"),
                    link: productItemDomElemnt.getAttribute("data-link"),
                    quantity: 1
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
        });
    }

    class Product{
        constructor(img, name, price, id, link, quantity){
            this.quantity = quantity;
            this.img = img;
            this.name = name;
            this.price = price * quantity;
            this.id = id;
            this.link = link; 
        }
        createCard(){
           const div  = document.createElement('div');
           div.classList.add("pop-cart__item");
           div.setAttribute("data-id", this.id);
           div.setAttribute("data-price", this.price);
           div.innerHTML = `
           <div class="pop-cart__info">
                <a href = "${this.link}" class="pop-cart__info-img" style="background-image: url(${this.img});"></a>
                <a href = "${this.link}" class="pop-cart__info-descr">${this.name}</a>
            </div>
            <div class="cart-item__data">
                <input type="hidden" name="${this.id}-Товар" value="${this.name}">
                <input class="js-cart-input-quantity" type="hidden" name="${this.quantity}-Количество" value="${this.quantity}">
                <input class="js-cart-input-price" type="hidden" name="${this.price}-Цена" value="${this.price}">
                <input class="js-cart-input-info" type="hidden" name="Cпецификация" value="${specification}">
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
                <p> <span>173 600</span> р за штуку</p>
            </div>
            <button class="pop-cart__item-close"></button>
           `;
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
                let {img, name, price, id, link, quantity} = dataMas[item];
                const cartProductItem = new Product(img, name, price, id, link, quantity);
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
}

export {cart};