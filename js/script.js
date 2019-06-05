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
  function timeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()), //(с помощью parse)
      seconds = Math.floor((t / 1000) % 60), // округляем до целого ( Math.floor), получаем секунды и остаток от деления на 60
      minutes = Math.floor((t / 1000 / 60) % 60), // округляем-секунды-минуты-остаток от деления на 60
      hours = Math.floor(t / 1000 / 60 / 60); // часы
    // Math.floor((t/1000/60/60) % 24); это если понадобятся дни
    console.log(t);
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

let more  = document.querySelector('.more');
let  overlay = document.querySelector('.overlay');
let close = document.querySelector('.popup-close');
let descriptionBtn = document.querySelectorAll('.description-btn');

descriptionBtn.forEach((e) => {
  e.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });
});



more.addEventListener('click', function() {
  overlay.style.display = 'block';
  this.classList.add('more-splash');
  document.body.style.overflow = 'hidden';
 
});


 close.addEventListener('click', function() {
  overlay.style.display = 'none';
  more.classList.remove('more-splash');
  document.body.style.overflow = '';
 });

});