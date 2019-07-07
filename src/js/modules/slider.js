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