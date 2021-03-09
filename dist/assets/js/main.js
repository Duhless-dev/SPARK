import  $ from 'jquery';
import 'slick-carousel';
import SimpleBar from 'simplebar';
import {makeFilterButton} from "./modules/filter";
import {FPS} from "./modules/tabs-my";
import {tabs} from "./modules/tabs-my";
import {cart} from "./modules/cart";
import {modal} from "./modules/modal";
import {burger} from "./modules/burger";
import {calcHeight} from "./services/service";
import {scrollConfig} from "./modules/scroll";
import {configurator} from "./modules/configurator";


window.onload = function(){
	let preloader = document.querySelector('.preloader');
	preloader.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () =>{

	

	$('.main-slider__inner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: '<div class="main-slider__arrows"></div>',
		prevArrow: '<div class="main-slider__arrows main-slider__arrows-left"></div>',
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 1500,
		dots: true,
	});

	$('.item-photo-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: '<div class="main-slider__arrows"></div>',
		prevArrow: '<div class="main-slider__arrows main-slider__arrows-left"></div>',
		speed: 1500,
		dots: true,
		responsive:[
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 2,
				}	
			},
			{
				breakpoint: 851,
				settings: {
					slidesToShow: 1,
				}	
			},
		]
	});

	$('.config-result__slide').on('click',()=>{
		$('.config-result__total-list').slideToggle();
		$('.config-result__slide').toggleClass('rotate-arrow');	
	});

	
	try{
		document.querySelectorAll('.config-tabs__buttons').forEach(el=>{
			new SimpleBar((el));
		});
	}catch(e){
	}
	


	
	try{
		FPS();
		tabs(".tabs-items__item",".tabs-button__item",".tabs-button__inner",".tabs-button--active");
	}catch(e){
		console.log('tabs, FPS');
	}

	try{

	tabs(".config-tabs__content-items",".config-tabs__buttons button",".config-tabs__buttons",".config-btn__active", false);
	}catch(e){
		console.log('tabs');
	}

	try{
		makeFilterButton();
	}catch(e){
	}

	try{
		burger();
	}catch(e){
		console.log('burger');
	}
	
	try{
		modal(".pop-cart",".modal-universal__close img",".header-cart",".pop-cart__inner",);
	}catch(e){
		console.log('modal1');

	}
	try{
		modal(".modal-config",".modal-universal__close img",".content-list__item-info",".modal-config__wrapper",'.modal-config__inner','.content-list__item', true);
	}catch(e){
		console.log('modal2');
	}
	
	try{
		cart();
	}catch(e){
		console.log('cart');
	}
	try{
		calcHeight('.configurator__table-list', '.configurator__content', 750);
	}catch(e){
		console.log('calcHeight');
	}
	try{
		scrollConfig();
	}catch(e){
		console.log('scroll');
	}
	
	try{
		configurator();	
	}catch(e){
		console.log('config');
	}
	

	


});

