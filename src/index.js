import _ from 'lodash';
import another from './js/another.js';
import css from './sass/styles.scss';

// main entry point: write your JavaScript here
console.log('Hello World!');

// testing babel
const str = 'ES6';
console.log(`Hello you, ${str}`);

// a component
function component() {
	let element = document.createElement('div');

	// Lodash, currently included via a script, is required for this line to work
	element.innerHTML = _.join(['Hello', 'Maya'], ' ');

	return element;
}

document.body.appendChild(component());

if (module.hot) {
	module.hot.accept();
}
