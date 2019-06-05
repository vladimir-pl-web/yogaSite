let age = document.getElementById('age');
function showUser(surname, name) {
	console.log("Пользователь " + surname + " " + name + ", его возраст " + this.age.value);
}
showUser('Plotnikovs', 'Vladimir');