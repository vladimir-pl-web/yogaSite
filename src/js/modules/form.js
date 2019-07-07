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