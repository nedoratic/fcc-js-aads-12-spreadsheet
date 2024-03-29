// Infix To Function Object
const infixToFunction = {
	'+': (x, y) => x + y,
	'-': (x, y) => x - y,
	'*': (x, y) => x * y,
	'/': (x, y) => x / y,
};

// Infix Eval
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

// Is Even
const isEven = (num) => num % 2 === 0;

// Sum
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);

// Average
const average = (nums) => sum(nums) / nums.length;

// Median
const median = (nums) => {
	const sorted = nums.slice().sort((a, b) => a - b);
	const length = sorted.length;
	const middle = length / 2 - 1;
	return isEven(length) ? average([sorted[middle], sorted[middle + 1]]) : sorted[Math.ceil(middle)];
};

// Spreadsheet Functions Object
const spreadsheetFunctions = {
	sum,
	average,
	median,
};

// Range
const range = (start, end) =>
	Array(end - start + 1)
		.fill(start)
		.map((element, index) => element + index);

// Character Range
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code) => String.fromCharCode(code));

// Eval Formula
const evalFormula = (x, cells) => {
	const idToText = (id) => cells.find((cell) => cell.id === id).value;
	const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
	const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
	const elemValue = (num) => (character) => idToText(character + num);
	const addCharacters = (character1) => (character2) => (num) => charRange(character1, character2).map(elemValue(num));
	const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
	const cellRegex = /[A-J][1-9][0-9]?/gi;
	const cellExpanded = rangeExpanded.replace(cellRegex, (match) => idToText(match.toUpperCase()));
};

// Window Onload Functionality
window.onload = () => {
	const container = document.getElementById('container');
	const createLabel = (name) => {
		const label = document.createElement('div');
		label.className = 'label';
		label.textContent = name;
		container.appendChild(label);
	};
	const letters = charRange('A', 'J');
	letters.forEach(createLabel);
	range(1, 99).forEach((number) => {
		createLabel(number);
		letters.forEach((letter) => {
			const input = document.createElement('input');
			input.type = 'text';
			input.id = letter + number;
			input.ariaLabel = letter + number;
			input.onchange = update;
			container.appendChild(input);
		});
	});
};

// Update
const update = (event) => {
	const element = event.target;
	const value = element.value.replace(/\s/g, '');
	if (!value.includes(element.id) && value.startsWith('=')) {
	}
};
