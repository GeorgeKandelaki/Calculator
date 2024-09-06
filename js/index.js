// "use strict";

const keys = document.querySelectorAll(".calculator__key");

const btnReset = document.querySelector(".calculator__key--reset");
const btnDelete = document.querySelector(".calculator__key--delete");
const btnEqual = document.querySelector(".calculator__key--equal");

const input = document.querySelector(".calculator__input");

const keysContainer = document.querySelector(".calculator__keypad");

const themeSwitch = document.querySelector(".theme__switch");

let oldTotal = "";
let total = "";
input.value = total;

function deleteLastCharacter(str) {
	return str.slice(0, -1);
}

function checkDuplicates(str, arrEl) {
	const arr = str.split("");
	const i = arr.length - 2;
	let newStr = str;

	if (arrEl.includes(arr[i]) && arr[i] === arr[i + 1]) {
		arr.pop();
		newStr = arr.join("");
	}

	return newStr;
}

function checkForMultiplyDots(str2, oldStr2) {
	const arr = str2.split("");
	let occurenceCount = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === ".") occurenceCount++;
		if (occurenceCount > 1) {
			oldStr2 = deleteLastCharacter(oldStr2);
			str2 = deleteLastCharacter(str2);
		}
	}

	return { str2, oldStr2 };
}

function checkForCalcErrors(str, oldStr) {
	if (
		(str.length > 1 && str[0] === "0" && str[1] !== ".") ||
		str.startsWith(".")
	) {
		oldStr = deleteLastCharacter(oldStr);
		str = deleteLastCharacter(str);
	}

	return { str, oldStr };
}

function checkIfCalcStartsWithOperator(str, oldStr) {
	if (isNaN(Number(oldStr[0]))) {
		oldStr = deleteLastCharacter(oldStr);
		str = deleteLastCharacter(str);
	}

	return { str, oldStr };
}

function changeThemes(themeType) {
	// THEME COLORS
	const bodyColors = ["#3a4764", "#e6e6e6", "#160628"];
	const screenColors = ["#182034", "#ededed", "#1d0934"];
	const keypadColors = ["#232c43", "#d1cccc", "#1d0934"];
	const keyColors = [
		{ color: "#eae3dc", shadow: "#b4a597" },
		{ color: "#e5e4e1", shadow: "#a69d91" },
		{ color: "#341c4f", shadow: "#871c9c" },
	];
	const resetColors = [
		{ color: "#637097", shadow: "#404e72" },
		{ color: "#377f86", shadow: "#1b5f65" },
		{ color: "#58077d", shadow: "#bc15f4" },
	];
	const equalColors = [
		{ color: "#d03f2f", shadow: "#93261a" },
		{ color: "#ca5502", shadow: "#893901" },
		{ color: "#00e0d1", shadow: "#6cf9f2" },
	];
	const textColors = ["#444b5a", "#35352c", "#ffe53d"];
	const screenTextColors = ["#ffffff", "#35352c", "#ffe53d"];
	const resetTextColors = ["#ffffff", "#ffffff", "#ffffff"];
	const equalTextColors = ["#ffffff", "#ffffff", "#1b2428"];

	// ELEMENTS
	const body = document.body;
	const screen = body.querySelector(".calculator__input");
	const keypad = body.querySelector(".calculator__keypad");
	const keys = body.querySelectorAll(".calculator__key");
	const equal = body.querySelector(".calculator__key--equal");
	const reset = body.querySelector(".calculator__key--reset");
	const del = body.querySelector(".calculator__key--delete");
	const heading = body.querySelector(".heading-secondary");

	const themeName = body.querySelector(".theme__name");
	const themeNums = body.querySelector(".theme__nums");
	const themeSwitchBox = body.querySelector(".theme__switch-box");

	// SWITCHING THEMES
	body.style.backgroundColor = bodyColors[themeType];

	screen.style.backgroundColor = screenColors[themeType];
	screen.style.color = screenTextColors[themeType];

	keypad.style.backgroundColor = keypadColors[themeType];

	keys.forEach((key) => {
		key.style.backgroundColor = keyColors[themeType].color;
		key.style.boxShadow = `0 6px 0 ${keyColors[themeType].shadow}`;
		key.style.color = textColors[themeType];
	});

	equal.style.backgroundColor = equalColors[themeType].color;
	equal.style.boxShadow = `0 6px 0 ${equalColors[themeType].shadow}`;
	equal.style.color = equalTextColors[themeType];

	reset.style.backgroundColor = del.style.backgroundColor =
		resetColors[themeType].color;
	reset.style.boxShadow =
		del.style.boxShadow = `0 6px 0 ${resetColors[themeType].shadow}`;
	reset.style.color = del.style.color = resetTextColors[themeType];

	themeName.style.color =
		heading.style.color =
		themeNums.style.color =
			screenTextColors[themeType];
	themeSwitch.style.backgroundColor = equalColors[themeType].color;
	themeSwitchBox.style.backgroundColor = keypadColors[themeType];
}
changeThemes(0);

keysContainer.addEventListener("click", (e) => {
	const { target } = e;
	const {
		target: { value },
	} = e;

	if (target.classList.contains("calculator__key")) {
		oldTotal += value;
		total += value;

		const { oldStr, str } = checkForCalcErrors(total, oldTotal);
		oldTotal = oldStr;
		total = str;

		const { oldStr2, str2 } = checkForMultiplyDots(total, oldTotal);
		oldTotal = oldStr2;
		total = str2;
	}

	if (
		target.classList.contains("calculator__key--multiply") ||
		target.classList.contains("calculator__key--divide") ||
		target.classList.contains("calculator__key--menus") ||
		target.classList.contains("calculator__key--plus")
	) {
		const { oldStr } = checkIfCalcStartsWithOperator(total, oldTotal);
		oldTotal = checkDuplicates(oldStr, ["+", "/", "*", "-"]);
		total = "";
	}

	if (target.classList.contains("calculator__key--delete")) {
		oldTotal = deleteLastCharacter(String(oldTotal));
		total = deleteLastCharacter(String(total));
	}

	if (target.classList.contains("calculator__key--reset"))
		total = oldTotal = "";

	if (target.classList.contains("calculator__key--equal") && oldTotal)
		total = oldTotal = eval(oldTotal);

	input.value = String(total);
});

document.addEventListener("keydown", (e) => {
	const { key } = e;
	const numArr = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"7",
		"8",
		"9",
		"0",
		"+",
		"-",
		"/",
		"*",
		"0",
		".",
	];

	if (numArr.includes(key)) {
		oldTotal += key;
		total += key;

		const { oldStr, str } = checkForCalcErrors(total, oldTotal);
		oldTotal = oldStr;
		total = str;

		const { oldStr2, str2 } = checkForMultiplyDots(total, oldTotal);
		oldTotal = oldStr2;
		total = str2;
	}

	if (key === "/" || key === "+" || key === "-" || key === "*") {
		const { oldStr } = checkIfCalcStartsWithOperator(total, oldTotal);
		oldTotal = checkDuplicates(oldStr, ["+", "/", "*", "-"]);
		total = "";
	}

	if (key === "Backspace") {
		oldTotal = deleteLastCharacter(String(oldTotal));
		total = deleteLastCharacter(String(total));
	}

	if (key === "Delete") total = oldTotal = "";

	if (key === "Enter" && oldTotal) total = oldTotal = eval(oldTotal);

	input.value = String(total);
});

document.querySelector(".theme__switcher").addEventListener("click", (e) => {
	const { target } = e;
	const {
		target: {
			dataset: { type },
		},
	} = e;
	if (!target.classList.contains("theme__num")) return false;
	themeSwitch.style.transform = `translateX(${type * 110}%)`;
	changeThemes(type);
});
