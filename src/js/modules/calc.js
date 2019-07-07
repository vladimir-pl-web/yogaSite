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