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