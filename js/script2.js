let age = document.getElementById('age');

let btn = document.querySelector('#btn');

class Options {
  constructor(height, width, bg, fontSize) {
		this.width = width;
		this.height = height;
		this.bg = bg;
    this.fontSize = fontSize;
  
  }
  createDiv() {
    let el = document.querySelector("body");
    let div = document.createElement("DIV");
		div.textContent = age.value;
		div.style.fontSize =  this.fontSize;
		div.style.height =  this.height;
		div.style.width =  this.width;
		div.style.backgroundColor =  this.bg;
    el.appendChild(div);
    console.log(el);
  }
}

btn.addEventListener('click', () => {
	if(!age.value == '') {
		let create = new Options('45px', '100px', 'red', '36px');
	create.createDiv();
	}

age.value = ''; 
});


function makeArray() {
	let items = [];
	for (let i = 0; i < 10; i++ ) {
		let item = function() {
			console.log(i);
		};
		items.push(item);
	}
	return items;
}

let arr = makeArray();

arr[1]();
arr[3]();
arr[2]();


let obj = {
	name: '1111',
	surname: '2222',
	sayNumber: func = () => {
		let fun = () => {
			console.log(this);
		}
		fun();
	}
}
obj.sayNumber();

class Rectanle {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}
	calculation () {
		return this.height * this.width;
	}
	
}
const square = new Rectanle(12, 30);
console.log(square.calculation());

class Calc {
	sum(a, b) {
		return a + b;
	}
	diff(a, b) {
		return a - b;
	}
	mull(a, b) {
		return a * b;
	}
	div(a, b) {
		return a / b
	}
};

const calculation = new Calc();
console.log(calculation.sum(10, 8));

class sqrCalc  extends Calc {
	sum(a, b) {
		return super.sum(a, b) ** 2;
	}
	diff(a, b) {
		return super.diff(a, b) ** 2;
	}
	mull(a, b) {
		return super.mull(a, b) ** 2;
	}
	div(a, b) {
		return super.div(a, b) ** 2;
	}
};
const sqr = new sqrCalc();
console.log(sqr.sum(1, 2));
console.log(sqr.diff(1, 2));
console.log(sqr.mull(1, 2));

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let [a, b, c, ...rest] = numbers;
console.log(a, b, c, rest);

function summa() {
	let result = 0;
	for(let i = 0; i < arguments.length; i++) {
		result += arguments[i];
	}
	return result;
}
let result = summa(...numbers);
console.log(result);





