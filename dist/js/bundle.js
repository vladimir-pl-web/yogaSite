/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  /// калькулятор
  let persons = document.querySelectorAll('.counter-block-input')[0],
  days = document.querySelectorAll('.counter-block-input')[1],
    place =document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = '',
    DaysSum = '',
    total = 0;

    totalValue.innerHTML = 0;
    
    persons.addEventListener('change', function() {
      personsSum = +this.value;
   
      total = (personsSum + DaysSum)*350;
      if(days.value == '') {
        totalValue.innerHTML = 0;
      }
      else if (personsSum === 0) {
        totalValue.innerHTML = 0;
      }
      else { totalValue.innerHTML = total}
   
    });


   days.addEventListener('change', function() {
     
      DaysSum = +this.value;

      total = (personsSum + DaysSum)*350;
      if(persons.value == '') {
        totalValue.innerHTML = 0;
      }
      else if (DaysSum === 0) {
        totalValue.innerHTML = 0;
      }
      else { totalValue.innerHTML = total;}
      
    });

    place.addEventListener('change', function() {
      if(persons.value == '' || days.value == '') {
        totalValue.innerHTML = 0;
      }
      else {
        let a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
      }
    });

}
module.exports = calc;

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {
  /// форма

 let message = {
  loading: ' Загружается...',
  sucess:  ' Спасибо, заявка получена',
  failure: ' Произошла ошибка'

};


let form = document.querySelectorAll('.main-form, #form'),
input = document.querySelectorAll('.form-input'),
statusMessage = document.createElement('DIV');

statusMessage.classList.add('status');

for(let item of form) {
 item.addEventListener('submit', (e) => {
   e.preventDefault();
   console.log('done');
   item.appendChild(statusMessage);
   let formData = new FormData(item);
   let obj = {};
   formData.forEach(function(value, key) {
     obj[key] = value;
   });
   let json = JSON.stringify(obj);

   function postData(data) {
     return new Promise(function(resolve, reject) {
       let request = new XMLHttpRequest();
       request.open('POST', '/server.php');
       request.setRequestHeader('Content-Type', 'application/json: charset=utf-8' );

       request.addEventListener('readystatechange', () => {
         if(request.readyState < 4) {
           resolve();
         }
         else if(request.readyState === 4 && request.status == 200) {
           resolve();
         }
         else {
           reject();
         }
       });
       request.send(data);
     });
     
   }
   
   function clearInput() {
     for(let inp of input) {
       inp.value = '';
     }
   }


   postData(json)
     .then(() => {
       statusMessage.innerHTML = message.loading;
     })
     .then(() => {
       statusMessage.innerHTML = message.sucess;
     })
     .catch(() => {
       statusMessage.innerHTML = message.failure;
     })
     .then(() => {
       clearInput()
     });
 });
}

}
module.exports = form;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
  /// модальное окно

let more  = document.querySelector('.more'),
overlay = document.querySelector('.overlay'),
close = document.querySelector('.popup-close'),
descriptionBtn = document.querySelectorAll('.description-btn');

descriptionBtn.forEach((e) => { /// модальное окно привяжем к кнопкам узнать больше
e.addEventListener('click', function () {
  overlay.style.display = 'block';
  this.classList.add('more-splash');
  document.body.style.overflow = 'hidden';
});
});



more.addEventListener('click', function() { /// модальное окно привяжем к большшой кнопке
overlay.style.display = 'block';
this.classList.add('more-splash');
document.body.style.overflow = 'hidden';

});


close.addEventListener('click', () =>  { /// закрытие модального окна
overlay.style.display = 'none';
more.classList.remove('more-splash');
document.body.style.overflow = '';
});
}
module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
  /// слайдер 

let slideIndex = 1,
slides = document.querySelectorAll('.slider-item'),
prev = document.querySelector('.arrow-left'),
next = document.querySelector('.arrow-right'),
dotsWrap = document.querySelector('.slider-dots'),
dots = document.querySelectorAll('.dot');
console.log(dots);
showSlides(slideIndex);

function showSlides(n) {

  // сделаем карусель
  if(n > slides.length) { // если n, то есть номеh слайда больше длины слайдера
    slideIndex = 1;  // то вернем первый слайд
  } 
  if(n < 1) { // если меньше 1
    slideIndex = slides.length; // то приравняем к длине слайдера. То есть на последний элемент
  }
  slides.forEach((item) => item.style.display = 'none'); // скрыли слайды
  dots.forEach((item) => item.classList.remove('dot-active')); // убираем активный класс с точек

  // показываем первый слайд и активизируем первую точку. передадим в slideInde, а он равен 1, но
  // в js все начинается с нуля, поэтому - 1. Тоже и для точек. И приравняв slideIndex к любому числу
  // можно начать показ с любого слайдера синхрониз. с нужной точкой. Пока начинаем с первого (0 индекс в массиве)

  slides[slideIndex -1].style.display = 'block'; 
  dots[slideIndex -1].classList.add('dot-active');
}

// это будет увеличивать параметр slideIndex. т.е вперед
function nextSlide(n) {
  showSlides(slideIndex += n); // вызываем шоуслайд с аргументом slideIndex увеличенный на зачение  n
}

// это будет синхронизацией текущего слайда с точками
function currentSlide(n) {
  showSlides(slideIndex = n); //вызываем шоуслайд с аргументом slideIndex с переданым значением   n
}

// обработчик событий на кнопку вперед и назад 
prev.addEventListener('click', () => {
  nextSlide(-1);
});

next.addEventListener('click', () => {
  nextSlide(1);
});

// реализуем точки с помощью делегирования 
dotsWrap.addEventListener('click', function(e) {
 
  // тут в цикле добавим лишнюю итерацию так как массив начинается с нуля а наши слайды с единицы
  // то есть нам надо пять итераций
  for(let i = 0; i < slides.length + 1; i++) {
    // делаем проверку есль ли нужный класс у таргета а во второй части проверяем индекс точки
    // он должен быть на единицу меньше, так как у нас лишняя итерация
    
    if (e.target.classList.contains('dot') && e.target == dots[i-1]) {
      currentSlide(i);// тогда запускаем текущий слайд с индексом точки
    }
  }

});
}
module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
  let tab = document.querySelectorAll(".info-header-tab");
  let info = document.querySelector(".info-header");
  let tabContent = document.querySelectorAll(".info-tabcontent");

  /// скрываем содержимое табов с помощью замены классов,
  const hideTabContent = a => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  };
  /// но оставляем  класс show для первого элемента в списке.
  hideTabContent(1);

  /// а тут показываем содержимое. если контент содержит класс хайд
  /// то убираем этот класс и добавляем класс show
  const showTabContent = b => {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  };

  /// вешаем обработчик на контейнер с кнопками (делегирование)
  info.addEventListener("click", e => {
    let target = e.target;
    if (target && target.classList.contains("info-header-tab")) {
      // если таргет и его классы содержат info-header-tab
      for (let i = 0; i < tab.length; i++) {
        // то перебираем кнопки
        if (target == tab[i]) {
          // и если таргет равен индексу таба
          console.log(tab[i]);
          console.log(target); // чисто для проверки, чтоб было понятнее
          hideTabContent(0); //(то есть нулевой таргет-кнопка совпадает с нулевым индексом таба и тдт )
          showTabContent(i); // тогда скрываем остальной таб контент и показываем через i
          //тот, который совпал с e.target (то есть tab[1] покажет первый контент и тд)
          break;
        }
      }
    }
  });
}
module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    /// Таймер

    let deadline = '2019-08-01';

    // Узнаем остаток между сейчас и дедлайном в милисекундах
    const  timeRemaining = endtime => {
      let t = Date.parse(endtime) - Date.parse(new Date()), //(с помощью parse)
        seconds = Math.floor((t / 1000) % 60), // округляем до целого ( Math.floor), получаем секунды и остаток от деления на 60
        minutes = Math.floor((t / 1000 / 60) % 60), // округляем-секунды-минуты-остаток от деления на 60
        hours = Math.floor(t / 1000 / 60 / 60); // часы
      // Math.floor((t/1000/60/60) % 24); это если понадобятся дни
      
      return {
        'total' : t,
        'hours' : hours,
        'minutes' : minutes,
        'seconds': seconds
      };
    };
  
  // напишем функцию устанавливающую часы
  
  const setTime = (id, endtime) => {
    // получим нужные переменные
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(timeUpdate, 1000);
  
      /// Сделаем функцию обновляющую таймер
      function  timeUpdate() {
        // передадим в переменную объект что вернула функция timeRemaining 
        let r = timeRemaining(endtime);
        hours.textContent = r.hours;
        minutes.textContent = r.minutes;
        seconds.textContent = r.seconds;
        if(r.total <= 0) {
          clearInterval(timeInterval);
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
        }
        if (r.seconds <= 9) {
          seconds.textContent =  '0' + r.seconds;
        }
        if (r.minutes <= 9) {
          minutes.textContent =  '0' + r.minutes;
        }
        if (r.hours <= 9) {
          hours.textContent =  '0' + r.hours;
        }
      }
  
  };
  
  // вызываем сет тайм первым агрументом идет ID  дива где лежит наш таймерб вторым дата окончания таймера
  setTime('timer', deadline);
}
module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener("DOMContentLoaded", function () {
  "use strict";
  let calc = __webpack_require__(/*! ./modules/calc.js */ "./src/js/modules/calc.js"),
    form = __webpack_require__(/*! ./modules/form.js */ "./src/js/modules/form.js"),
    modal = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js"),
    slider = __webpack_require__(/*! ./modules/slider.js */ "./src/js/modules/slider.js"),
    tabs = __webpack_require__(/*! ./modules/tabs.js */ "./src/js/modules/tabs.js"),
    timer = __webpack_require__(/*! ./modules/timer.js */ "./src/js/modules/timer.js");

  calc();
  form();
  modal();
  slider();
  tabs();
  timer();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map