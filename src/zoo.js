const API_BASE = 'http://localhost:3000/';

export default class Zoo {
	constructor() {
	}
	getAnimals() {
		fetch(API_BASE + 'zvirata')
		.then(response => response.json())
		.then(data => {
			this.showAnimals(data);
			});
	}

	showAnimals(data) {
		let zvirata = document.querySelector('#zvirata');
		let html = ` `;
		data.forEach(zvire => {
			html += `
			<div class="zvire" data-id="${zvire.id}">
			<div class="zvire__foto">
				<img src="images/${zvire.foto}" alt="${zvire.nazev}">
			</div>
			<div class="zvire__popis">
				<div class="zvire__nazev">${zvire.nazev}</div>
				<div class="zvire__latinsky">${zvire.nazevLatinsky}</div>
			</div>
			</div>
			`});
		zvirata.innerHTML = html;
		let tlacitka = document.querySelectorAll('.zvire');
		tlacitka.forEach(tlacitko => {
			tlacitko.addEventListener('click', (e) => {
				this.animalClick(e.target);
			});
		});
	}
	animalClick(element) {
		// let id = e.target.dataset.id;
		let prvek = element.closest('.zvire');
		let id = prvek.dataset.id;
		this.getAnimal(id);
	}
	getAnimal(id) {
		fetch(API_BASE + 'zvirata/' + id)
		.then(response => response.json())
		.then(data => {
			this.showAnimal(data);
			});
	}
	showAnimal(data){
// console.log(data);
		document.querySelector('.detail__foto').src = 'images/' + data.foto;
		document.querySelector('.detail__foto').alt = data.nazev;
		document.querySelector('#nazev').textContent = data.nazev;
		document.querySelector('#latinsky').textContent = data.nazevLatinsky;
		document.querySelector('#popis').textContent = data.popis;
		document.querySelector('#domovina').textContent = data.domovina;
		document.querySelector('#biotop').textContent = data.biotop;
		document.querySelector('#potrava').textContent = data.potrava;
		document.querySelector('#velikost').textContent = data.velikost;

		data.zoo.forEach(zoo => {
			this.getZoo(zoo);
		});
	}
	getZoo(id) {
		fetch(API_BASE + 'zoo/' + id)
		.then(response => response.json())
		.then(data => {
			this.showZoo(data);
		});
	}
	showZoo(data) {
		console.log(data.jmeno);
		let pole = [];
		data.zoo.forEach(zoo => {
			pole.push(fetch(API_BASE + 'zoo/' + zoo));
		});
		Promise.all(pole)
			.then(responses => {
				let pojeJson = [];

				responses.forEach(response => {
					poleJson.push(response.json());
				})

		Promise.all(poleJson)
				.then(zoos => {
					console.table(zoos);
				})
			});
	}
}