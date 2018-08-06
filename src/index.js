// main entry point: write your JavaScript here
console.log("Hello World!");

// testing babel
const str = "ES6";
console.log(`Hello you, ${str}`);

if (module.hot) {
	module.hot.accept();
}
