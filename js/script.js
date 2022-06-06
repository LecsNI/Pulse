// $(document).ready(function(){ /* $ это библиотека jquery / $(document) обращение к доку html / .ready(function() - код будет запускаться тогда когда будет html  */
//	$('.carousel__inner').slick({
//		speed: 1200, /* скорость с какой один слайд будет переключатся */
// 		adaptiveHeight: true, /* адаптивная высота, слайдер будет адаптироваться под картинки разной высоты */
//		prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/chevron-left.svg"></button>', /* с помощью этого можно стилизовать кнопки переключения */
//		nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/chevron-right.svg"></button>',
//		responsive: [ /* [] - обозначают что это массив данных / responsive для адаптивности */
//			{
//				breakpoint: 992, /* на каком расширении будут работать правила ниже / причем работают от 0 до 768 px */
//				settings: {
//					arrows: false,
//				  	dots: true
//				}
//			}
//		]
//		autoplay: true, /*автопереключение */
//		autoplaySpeed: 2000, /* скорость автопереключения */
//		fade: true, /* Картинка проявляется с заднего фона */
//		cssEase: 'linear', /* эфект проявления fade */
//		dots: true, /* кружочки внизу для навигации */
//		infinite: true, /* true значит что можно листать карусель бесконечно */
//		slidesToShow: 2, /* сколько слайдев  будет показывать одновременно */
//		slidesToScroll: 2 /* сколько слайдев  будет перелистывать при нажатии на кнопки */
//		arrows: false  /* выключение стрелок перключения */
		 
//	});  /* $('.carousel__inner') с пом jquery получаем класс */
//  });

const slider = tns({
    container: '.carousel__inner', // здесь нужно указать класс или id
    items: 1, // кол-во картинок отобр в каруселе
    slideBy: 'page', 
    autoplay: false, // анимац перекл
	controls: false,
	mouseDrag: true,
	speed: 1200,
    autoplay: 2500,
	navPosition: "bottom",
//	autoplayHoverPause: true, //перестают переключаться при наведении
	autoplayButtonOutput: false, // убирает кнопку переключения анимации
	responsive: { //добавление точек навигации нужно прописывать каждое разрешение, иначе начнутся баги 
		320: {
			nav: true,
	    },
		576: {
			nav: true,
	    },
		768: {
			nav: true, 
		},
		900: {
 			nav: false,
		},
		1200: {
			nav: false
	   }
	} 
  });
//document.querySelector('.prev').onclick = function () { /*document.querySelector - из html получаем элемент по селектору -('.goto-button') / .onclick = function () .onclick - gпри нажатии вызывается функция*/
//	slider.goTo('prev');/* функция кот выз это слайдер*/
//  };
  document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');/* функция кот выз это слайдер*/ 
});
document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');/* функция кот выз это слайдер*/ 
});

$(document).ready(function(){ /* $ это библиотека jquery / $(document) обращение к доку html / .ready(function() - код будет запускаться тогда когда будет html  */
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { // catalog__tabs это переключает табы / 'click', 'li:not(.active)' - клик на li у кого нет класса active
		$(this) //  $(this) сслыает на элемент на кот мы т.ч. кликнули
		.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') // .addClass('catalog__tab_active') - меняем класс на активный / .siblings() - соседние табы / .removeClass('catalog__tab_active')  удал у них этот класс 
		.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); //.closest - найт ближайший элем - container /  .find('div.catalog__content') - где найти данный элемент / .removeClass('catalog__content_active') - удаляем класс / eq($(this).index()) определяет на какой таб нажал по нумерации, такую стр с контентом и откр / .addClass('catalog__content_active'); - доб класс
	});

	function toggleSlide(item) { // сами пишем функцию и вместо item можем писать любой класс
		$(item).each(function(i) { //.each - перебор кажд элемента function(i) - функция описан ниже / i это выбранная функция из перебранных
			$(this).on('click', function(e) { // $(this) перебор на кажд ссылку / .on('click', - при клике / function(e) новая функция 
				e.preventDefault(); // e.preventDefault(); отменяет переход ссылки по определенному адресу, а выполняет что-то другое
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); // toggleClass - если класс есть он удаляется, если нет, он добавл / .eq(i) раб только на выбранном элементе
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); 
			})
		});
	};

	toggleSlide('.catalog-item__link'); // доб классы в нашу фукцию и раб и опитизимровано 
	toggleSlide('.catalog-item__back');


	// Modal windows

	$('[data-modal=consultation]').on('click', function() { 	// $ - чтоб получить элементы со стр /  чтобы вытащить дата атрибуты нужны - [] / .on('click', function() - при нажатии будет выпоняться это действие
		$('.overlay, #consultation').fadeIn('slow'); // $('.overlay, #consultation') - получаем эти объекты  и .fadeIn(); - показать их, т.к. они скрыты
	});
	$('.modal__close').on('click', function() { // .modal__close - крестик / при нажатии - .on('click',  будет вып функция -  function() { 
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow'); // все окошки перечисленные  / .fadeOut() анимация плавного исчезнов / закрытия
	});

	$('.button_mini').each(function(i) { //.each - gперебор всех кнопок / function(i) - i отв за номер элемента по порядку
		$(this).on('click', function() {// $(this) - та кнопка на кот сейчас нажали
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); //что в окне order, в строчку modal__descr - $('#order .modal__descr') нужно посметить текст из - .text($('.catalog-item__subtitle') / .eq(i) - eq - позв получить элемент по порядку, i - номер элемента смотря на какую конпку мы нажали / .text() - пустая это получать текст из указанного элемента
			$('.overlay, #order').fadeIn('slow'); //при нажатии откр окно
		})	
	}); 


	// Validation forms

	function validateForms(form){ // созд функции
		$(form).validate( {
			rules: { // правила
				name: {
					required: true,
					minlength: 2 // минимальное кол-во символом
				  },
				phone: "required", // name - имя формы / required - обязательная к заполнению
				email: { // так же можно открыть чтобы указать много правил
					required: true,
					email: true  // что это почта и должна вводиться по формату @mail.com
				}
			},
			messages: { // сообщения при проблемах ввода 
				name:  {
					required: "Пожалуйста, введите своё имя", // текст если что-то не так введено
					minlength: jQuery.validator.format("Введите {0}  символов") // ссылка на minlength: 2 // минимальное кол-во символом
				  },
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свою почту",
				  email: "Неправильно введен адрес почты"
				}
			  }
		});
	};

	validateForms('#consultation-form'); // функция будет работать на этих id
	validateForms('#consultation form');
	validateForms('#order form');

	// mask phone 

	$('input[name=phone]').mask("+7 (999) 999-99-99"); // $('input[name=phone]') находим к какой форме ссылаться тэг и название / .mask("+7 (999) 999-99-99") - создание самой маски

	$('form').submit(function(e) {  //обр ко всем формам / .submit - когда все услов потверждены и форма будет отправляться - function(e) - действик с под аргументом е
		e.preventDefault(); // e.preventDefault - отмена стандарт повед браузера, чтоб страница не перезагружалась
		
		if (!$(this).valid()) { //если форма не прош валидацию
			return; // ничего не произойдёт
		}
		
		$.ajax ({// отправка данных на сервер при помощ метода ajax кот есть в qjuerry
			type: "POST", // type - указ получ или отпр данные / "POST"  отправ данные на сервер
			url: "mailer/smart.php", // куда будет отправ запрос
			data: $(this).serialize() // data: - данные кот нужно отпр  / $(this) - работаем именно с опред формой, с кот отправляли данные, учитывая что их три form / .serialize() - что-то для серверной части
		}).done(function(){ // когда эта операция будет выполнена последует след
			$(this).find("input").val(""); // $(this) - в этой форме .find("input") - все инпуты т.е. строки для ввода .val(""); - стали пустыми value - это то что вводят в форму 
			$('#consultation, #order').fadeOut(); // эти окна будут закрываться
			$('.overlay, #thanks').fadeIn('slow'); // а эти появяться
			$('form').trigger('reset'); // $('form') - все формы / .trigger('reset'); должны обновится
		});
		return false; // не повторять?
	});

	//  Smooth scrool and pageup
	$(window).scroll(function() { // $(window) - на всёи окне .scroll(function() - при скролле будет выполняться функция
		if ($(this).scrollTop() > 1600) { // if - если / $(this) эта стр / .scrollTop()> 1600 при скролле более 1600 px
			$('.pageup').fadeIn(); // кнопка - '.pageup' будет появляться .fadeIn
		} else {
			$('.pageup').fadeOut();
		}
	});
	// Плавная прокрутка на Jquerry / можно использовать при любых ссылках - универсальный
	$("a[href^='#up']").click(function(){ // a[href^='#' - ссылка с атрибутом - ^ начинаться / с решетки - '#' / прик .click(function клике будет функция 
		const _href = $(this).attr("href"); // переменная - const с назв  _href / $(this).attr("href") в эту переменную падает значение кот было в "href"
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"}); // анимируется "html, body" 
		return false;
	});


	// animate scroll wow.js
	new WOW().init();

});
 