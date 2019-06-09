window.addEventListener("DOMContentLoaded", function() {
  "use strict";

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


});                                        

