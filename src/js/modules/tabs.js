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