window.addEventListener("DOMContentLoaded", function () {
  "use strict";
  let calc = require('./modules/calc.js'),
    form = require('./modules/form.js'),
    modal = require('./modules/modal.js'),
    slider = require('./modules/slider.js'),
    tabs = require('./modules/tabs.js'),
    timer = require('./modules/timer.js');

  calc();
  form();
  modal();
  slider();
  tabs();
  timer();
});