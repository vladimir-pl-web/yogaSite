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