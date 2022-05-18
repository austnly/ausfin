import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import fs from "fs";

const tableFetch = async (url) => {
	console.log("Starting table fetch...");
	const response = await fetch(url);
	const doc = new JSDOM(await response.text()).window;
	const tableEl = doc.document.getElementsByTagName("table")[0].tBodies[0];

	// console.log(tableEl.innerHTML);

	let rows = tableEl.rows.length;
	// find number of columns
	let cols = tableEl.getElementsByTagName("tr")[0].children.length;

	// console.log("Rows", rows, "\nCols", cols);

	const arr = [];
	// loop through table object, copy first column as arr[0], second as [1]
	for (let i = 0; i < cols; i++) {
		arr[i] = [];

		// loop through rows from index 1 to skip header row
		for (let j = 1; j < rows; j++) {
			arr[i][j - 1] = tableEl
				.getElementsByTagName("tr")
				[j].getElementsByTagName("td")[i].textContent;
		}
	}

	// console.log(arr);
	return arr;
};

const mlsFetch = async () => {
	console.log("Starting table fetch...");
	const url =
		"https://www.ato.gov.au/Individuals/Medicare-and-private-health-insurance/Medicare-levy-surcharge/Income-thresholds-and-rates-for-the-Medicare-levy-surcharge/";

	const response = await fetch(url);
	const doc = new JSDOM(await response.text()).window;
	const tableEl = doc.document.getElementsByTagName("table")[0].tBodies[0];

	const rows = tableEl.rows.length;
	// find number of columns
	const cols = tableEl.getElementsByTagName("tr")[0].children.length;

	const arr = [];
	// loop through table object, copy first row as arr[0], second as [1] etc.
	for (let i = 0; i < rows - 1; i++) {
		arr[i] = [];

		// loop through columns from index 1 to skip header row
		for (let j = 0; j < cols - 1; j++) {
			// i = 0, j = 0 - first row first <td> column
			arr[i][j] = tableEl
				.getElementsByTagName("tr")
				[i + 1].getElementsByTagName("td")[j].textContent;
		}
	}

	return arr;
};

/**
 * A function that cleans the tax table array into a usable number array
 * @returns {number[][]} Tax Table in number array form
 */
export const cleanTax = (taxTable) => {
	//cleans table data to usable float data
	let arr = [...taxTable];

	let col1 = arr[0];
	let col2 = arr[1];

	const newArr = [[], [], []];

	//extract first number in first column as lower threshold
	for (let i = 0; i < col1.length; i++) {
		let pre = col1[i];
		let idxOfSpace = pre.search(" ");
		let post = pre.slice(0, idxOfSpace);
		post = post.replace(",", "");
		if (pre[0] == "$") {
			post = post.slice(1);
		}
		// col1[i] = Number(post);
		newArr[0].push(Number(post));
	}

	//extract base tax for tax bracket
	for (let i = 0; i < col2.length; i++) {
		let pre = col2[i];
		let post;

		if (pre[0] == "N" || pre[0] == "1") {
			post = "0";
		} else {
			//$5,092 plus 32.5&#160;cents for each $1 over $45,000
			let idxOfSpace = pre.search(/\s/);
			pre = pre.slice(1, idxOfSpace);
			post = pre.replace(",", "");
		}
		// col3[i] = Number(post);
		newArr[2].push(Number(post));
	}

	//extract percentage rate for tax bracket
	for (let i = 0; i < col2.length; i++) {
		let pre = col2[i];
		let post;

		if (pre[0] == "N") {
			post = "0";
		} else if (pre[0] == "1") {
			let idxOfSpace = pre.search(/\u00a0/);
			post = pre.slice(0, idxOfSpace);
		} else {
			pre = pre.slice(1);
			let idxOfNBS = pre.search(/\u00a0/);
			let idxOfS = pre.search(/s/);
			post = pre.slice(idxOfS + 2, idxOfNBS);
		}
		// col2[i] = Number(post);
		newArr[1].push(Number(post));
	}

	return newArr;
};

/**
 * A function that converts an array with percentage values into numbers 0-100
 * @param {string[]} arr String array that refers to percentage values
 * @returns {number[]} numbers between 0-100 (%)
 */
export function shavePrcnt(arr = []) {
	for (let i = 0; i < arr.length; i++) {
		let pre = arr[i];
		let post;

		if (pre[0] == "N" || /^0%/.test(pre)) {
			post = "0";
		} else {
			post = pre.replace("%", "");
		}
		arr[i] = Number(post);
	}
	return arr;
}

/**
 * A function that converts an array with dollar value ranges into number thresholds with the start of range value
 * @param {string[]} arr String array that refers to dollar value ranges
 * @returns {number[]} numbers representing a dollar range's bottom threshold
 */
export function shaveThresh(arr = []) {
	for (let i = 0; i < arr.length; i++) {
		let pre = arr[i];
		let idxOfSpace = pre.search(" ");
		let post = pre.slice(0, idxOfSpace);
		post = post.replace(",", "");
		if (pre[0] == "B" || /or less/.test(pre)) {
			// special condition for first row
			post = "0";
		} else {
			post = post.slice(1);
		}
		arr[i] = Number(post);
	}
	return arr;
}

/**
 * A function that cleans the HELP table array into a usable number array
 * @returns {number[]} HELP Repayment Table in number array form
 */
export function cleanHelpTable(helpTable) {
	let arr = [...helpTable];

	let col1 = arr[0];
	let col2 = arr[1];

	//extract first number in first column as lower threshold
	arr[0] = shaveThresh(col1);

	//extract percentage for threshold
	arr[1] = shavePrcnt(col2);

	return arr;
}

/**
 * A function that cleans the Medicare Levy Surcharge table array into a usable number array
 * @returns {number[]} MLS Table in number array form
 */
export function cleanMLS(mlsTable) {
	const table = [...mlsTable];

	let col1 = table[0];
	let col2 = table[1];
	let col3 = table[2];

	// cleaning column 1
	table[0] = shaveThresh(col1);

	// cleaning column 2
	table[1] = shaveThresh(col2);

	// cleaning column 3
	table[2] = shavePrcnt(col3);

	return table;
}

const taxURL = "https://www.ato.gov.au/rates/individual-income-tax-rates/";

const helpURL =
	"https://www.ato.gov.au/Rates/HELP,-TSL-and-SFSS-repayment-thresholds-and-rates/";

tableFetch(taxURL)
	.then((arr) =>
		fs.writeFile("tax.json", JSON.stringify(cleanTax(arr)), (err) => {
			if (err) {
				console.log(err);
				return;
			}
		}),
	)
	.then(() => console.log("Tax table saved."));

tableFetch(helpURL)
	.then((arr) =>
		fs.writeFile(
			"help.json",
			JSON.stringify(cleanHelpTable(arr)),
			(err) => {
				if (err) {
					console.log(err);
					return;
				}
			},
		),
	)
	.then(() => console.log("HELP table saved."));
mlsFetch()
	.then((arr) =>
		fs.writeFile("mls.json", JSON.stringify(cleanMLS(arr)), (err) => {
			if (err) {
				console.log(err);
				return;
			}
		}),
	)
	.then(() => console.log("MLS table saved."));
