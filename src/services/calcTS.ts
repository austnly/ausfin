import taxTable from "./static/tax.json";
import helpTable from "./static/help.json";
import mlsTable from "./static/mls.json";

export interface IncomeData {
	income: number;
	incl: boolean;
	rate: number;
	max?: boolean;
}

export interface TaxResult {
	baseTax: number;
	taxBracket: number;
	totalTax: number;
	afterTax?: number;
}

export interface SuperResult {
	superContrib: number;
	reportableSuper: number;
	afterSuper?: number;
}

export interface HelpResult {
	helpRepay: number;
	helpRate: number;
}

export interface MlsResult {
	mlsRepay: number;
	mlsRate: number;
}

/**
 * A function that calculates the annual income tax paid on a provided income amount
 * @param {number} taxableIncome Annual income after super and tax deductions, before any other deductions
 * @returns {TaxResult}
 */
export const taxCalc = (
	taxableIncome: number,
	table: number[][] = taxTable,
): TaxResult => {
	// fetch cleaned tax table array
	const taxTable = table;

	// declare names for each column
	let thresh = taxTable[0];
	let prcnt = taxTable[1];
	let base = taxTable[2];

	let total = 0;
	let baseTax = 0;
	let taxBracket = 0;

	// check if income greater than top threshold
	// if yes, calculate total tax = base + overthresh * percent
	// if not, continue

	// loop from top threshold
	for (let i = thresh.length - 1; i >= 0; i--) {
		if (taxableIncome >= thresh[i]) {
			// if greater than threshold,
			baseTax = base[i];
			taxBracket = prcnt[i];
			total =
				base[i] + (taxableIncome - thresh[i] + 1) * (prcnt[i] / 100);
			break;
		}
	}

	return {
		baseTax: Math.round(baseTax),
		taxBracket: taxBracket,
		totalTax: Math.round(total),
		afterTax: Math.round(taxableIncome - total),
	};
}; // checked

/**
 * A function that returns net income after super contributions, and the super contributions, based on the following parameters
 * @param {IncomeData} incomeSuperInput  {
 * 		income: {number} Annual income before super contributions
 * 		incl: {boolean} True if super contributions to be deducted from provided income as standard, false if super contributions are paid on top of income
 * 		rate: {number} Value 0-100 representing % super contribution rate
 * 		max: {boolean} Set to true if super contributions are set to the allowed maximum concessional rate ($27,500)
 * }
 * @returns {SuperResult} Net income after super deducted, and Super contributions amount
 */
export const superCalc = (incomeSuperInput: IncomeData): SuperResult => {
	console.log("Arg for superCalc", incomeSuperInput);
	const { income, incl, rate, max } = { ...incomeSuperInput };

	let totalSup: number;
	let incExclSup: number;
	const maxContrib = 27500;

	if (max) {
		totalSup = maxContrib;
		if (incl) {
			incExclSup = income - maxContrib;
		} else {
			incExclSup = income - (maxContrib - income * (rate / 100));
		}
	} else {
		if (incl) {
			console.log("reaches here", income, rate);
			incExclSup = income / (1 + rate / 100); // e.g. 90k income incl 10% super gives 90/1.1 = 81.8k excl super
			totalSup = income - incExclSup;
		} else {
			// income doesn't include super
			totalSup = income * (rate / 100);
			incExclSup = income;
		}
	}

	const reportableSuper = totalSup - incExclSup * 0.095;

	return {
		afterSuper: Math.round(incExclSup),
		superContrib: Math.round(totalSup),
		reportableSuper: reportableSuper > 0 ? Math.round(reportableSuper) : 0,
	};
}; // checked

/**
 * A function that calculates the annual HELP repayment for a provided income amount
 * @param {number} incomeAssessable Annual income including super and fringe benefits, minus tax deductions
 * @returns {HelpResult} Amount of HELP repayment and Repayment rate %
 */
export const totalHELP = (incomeAssessable: number): HelpResult => {
	const hecsTable = [...helpTable];
	const col1 = hecsTable[0];
	const col2 = hecsTable[1];

	let prcnt = 0;

	// check income against threshold from highest threshold
	// if over threshold then set percentage
	for (let i = col1.length - 1; i >= 0; i--) {
		if (incomeAssessable >= col1[i]) {
			prcnt = col2[i];
			break;
		}
	}

	return {
		helpRepay: Math.round((incomeAssessable * prcnt) / 100),
		helpRate: prcnt,
	};
}; // checked

/**
 * A function that calculates the total Medicare Levy Surcharge for a provided income amount
 * @param {number} income Annual income after deductions plus fringe benefits
 * @param {"single" | "couple"} cat Must be "single" or "couple"
 * @returns {Result} Amount of Medicare Levy Surcharge and % Rate
 */
export const totalMLS = (
	incomeAssessable: number,
	cat: "single" | "couple" = "single",
): MlsResult => {
	const table = [...mlsTable];
	let col1;
	if (cat == "single") {
		col1 = table[0];
	}
	if (cat == "couple") {
		col1 = table[1];
	}
	let col2 = table[2];

	let prcnt = 0;

	for (let i = col1.length - 1; i >= 0; i--) {
		if (incomeAssessable >= col1[i]) {
			prcnt = col2[i];
			break;
		}
	}

	return {
		mlsRepay: Math.round((incomeAssessable * prcnt) / 100),
		mlsRate: prcnt,
	};
}; // checked

// ----- Private Funcs -----

interface NewHelp {
	balance: number;
	additional: number;
}

/**
 * A function that updates your HELP balance with repayments made during the year.
 * @param {number} current HELP balance at start of year period
 * @param {number} repay HELP repayment amount
 * @returns {{balance: number, additional: number}} HELP balance at end of year, and additional amount to add back to income if overpaid
 */
const updateHelp = (current: number, repay: number): NewHelp => {
	// assume 2% CPI increase
	let bal = Math.round(current * 1.02 - repay);

	if (bal > 0) {
		return {
			balance: bal,
			additional: 0,
		};
	} else {
		return {
			balance: 0,
			additional: -bal,
		};
	}
}; // checked

/**
 * A function that updates your yearly super balance with contributions made during the year.
 * This takes into account 15% contribution and investment gains tax.
 * @param {number} superBal Super balance at start of year period
 * @param {number} superContrib Amount of super contributed in the year period
 * @param {number} growth Assumed growth % as a value from 0-1
 * @returns {number} New super balance at the end of the year period
 */

const updateSuper = (
	superBal: number,
	superContrib: number = 0,
	growth: number = 7,
): number => {
	return Math.round(
		superBal * (1 + (growth * 0.85) / 100) + superContrib * 0.85,
	);
}; // checked

interface InvResult {
	growth: number;
	invBal: number;
}

/**
 * A function that updates your yearly investments balance with contributions made during the year.
 * Growth rate is assumed to be after any taxes.
 * @param {number} invBal Balance of index fund investments at the start of year period
 * @param {number} invContrib Amount contributed to investments during the year period
 * @param {number} growth Assumed growth % as a value from 0-1
 * @returns {number} New balance of index fund investments at the end of the year period
 */
const growInv = (
	invBal: number,
	invContrib: number = 0,
	growth: number = 7,
): InvResult => {
	console.log(invBal, invContrib, growth);
	return {
		growth: Math.round(invBal * (growth / 100)),
		invBal: Math.round(invBal * (1 + growth / 100) + invContrib),
	};
}; // checked

export class NetWorth {
	income: number;
	helpBal: number;
	superBal: number;
	invBal: number;

	constructor(
		income: number,
		helpBal: number = 0,
		superBal: number = 0,
		invBal: number = 0,
	) {
		this.income = income;
		this.helpBal = helpBal;
		this.superBal = superBal;
		this.invBal = invBal;
	}
}

/**
 * Constructs an Income Object which is used as an argument for the taxTime function
 * @param {number} income Annual income
 * @param {number} expenses Annual expenses
 * @param {number} deductions Tax deductions
 * @param {number} fringeBenefits Fringe benefits provided
 * @param {number} helpBal Current HELP balance
 * @param {number} superBal Current Super balance
 * @param {number} invBal Current Investments balance
 * @param {boolean} supIncl Whether super is included in annual income
 * @param {number} supRate Target super contribution rate as a 0-100%
 * @param {boolean} phi True if you have an MLS-exempt hospital cover policy
 */
export class IncomeTaxProfile implements NetWorth, IncomeData {
	income: number;
	incl: boolean; // Super inclusive
	rate: number; // Super contribution rate
	expenses: number;
	deductions: number;
	fringeBenefits: number;
	helpBal: number;
	superBal: number;
	invBal: number;
	phi: boolean;

	constructor(
		netWorth: NetWorth,
		// income: number,
		// helpBal: number = 0,
		// superBal: number = 0,
		// invBal: number = 0,

		expenses: number,
		incl: boolean = false,
		rate: number = 0,
		deductions: number = 0,
		fringeBenefits: number = 0,
		phi: boolean = false,
	) {
		// super(income, helpBal, superBal, invBal);
		this.income = netWorth.income;
		this.expenses = expenses;
		this.incl = incl;
		this.rate = rate;
		this.deductions = deductions;
		this.fringeBenefits = fringeBenefits;
		this.helpBal = netWorth.helpBal;
		this.superBal = netWorth.superBal;
		this.invBal = netWorth.invBal;
		this.phi = phi;
	}

	static create = (income: number, expenses: number): IncomeTaxProfile => {
		return new IncomeTaxProfile(new NetWorth(income), expenses);
	};

	static copy = (instance: IncomeTaxProfile): IncomeTaxProfile => {
		return new IncomeTaxProfile(
			{
				income: instance.income,
				helpBal: instance.helpBal,
				invBal: instance.invBal,
				superBal: instance.superBal,
			},
			instance.expenses,
			instance.incl,
			instance.rate,
			instance.deductions,
			instance.fringeBenefits,
			instance.phi,
		);
	};
}

/**
 * A function that calculates your net income after all super, tax, HELP, medicare, MLS payments, and determines updated HELP, Super and Investment balances after payments/contributions
 * @param {IncomeTaxProfile} incomeObj Yearly income object with the properties of an IncomeObject
 * @param {boolean} maxSuper
 * @param {boolean} drawingPhase Indicates whether investments should be drawn down
 * @param {boolean} paySup Indicates whether super should still be paid from income
 * @param {number} growth Assumed growth % as a value from 0-1
 * @returns {NetIncome} Net Income object (net income, HELP bal, Super bal, Investments bal)
 *
 */
export const taxTime = (
	incomeObj: IncomeTaxProfile,
	maxSuper: boolean = false,
	growth: number = 0,
	drawingPhase: boolean = false,
	paySup: boolean = true,
): NetIncome => {
	// Income after deductions
	console.log("Income Obj: ", incomeObj);
	let income = incomeObj.income;
	console.log(income);
	let supCont = 0;
	let repSup = 0;

	// Super contribution and income less super contribution
	if (paySup) {
		const { afterSuper, superContrib, reportableSuper } = superCalc({
			...incomeObj,
			max: maxSuper,
		});
		income = afterSuper;
		console.log(income);
		supCont = superContrib;
		repSup = reportableSuper;
	}
	// console.log(
	// 	`Income after deductions and super is ${income}, Super contribution is ${supCont}`,
	// );

	// Update super balance
	// console.log(`Previous super balance is ${incomeObj.superBal}`);
	let newSuper = updateSuper(incomeObj.superBal, supCont, growth);
	// console.log(`New super balance is ${newSuper}`);
	console.log(income);
	//Add investment earnings to income

	const invBalGrowth = growInv(incomeObj.invBal, 0, growth).growth;

	// if not drawing from investments, taxable income is regular income + growth on investments
	// if drawing from investments, and growth is greater than income required, then total taxable income will be solely from growth
	// if growth is not greater than income, then taxable income will be the target income generated from liquidating investments
	income = !drawingPhase
		? income + invBalGrowth
		: invBalGrowth > incomeObj.income
		? invBalGrowth
		: income;
	console.log(income);
	// determine hecs repayment and balance

	income -= incomeObj.deductions;
	console.log(
		"Assessable income",
		income,
		repSup,
		incomeObj.fringeBenefits,
		income + repSup + incomeObj.fringeBenefits,
	);
	const help = totalHELP(income + repSup + incomeObj.fringeBenefits);
	const helpRepay = help.helpRepay;
	const helpRate = help.helpRate;
	const helpNew = updateHelp(incomeObj.helpBal, helpRepay);
	const helpBalance = helpNew.balance;
	const helpOver = helpNew.additional;

	// medicare levy
	// low-income - medicare levy is 10% of amount over exempt threshold 23,266, above 29,033 is 2% of income
	const medicare =
		income < 23226
			? 0
			: income < 29033
			? Math.round((income - 23266) * 0.1)
			: Math.round(0.02 * income);

	// income tax
	const taxResult = taxCalc(income);
	const tax = taxResult.totalTax;

	// medicare levy surcharge
	let mlsRepay = 0;
	let mlsRate = 0;
	if (income >= 90000 && !incomeObj.phi) {
		const mls = totalMLS(income + incomeObj.fringeBenefits, "single");
		mlsRepay = mls.mlsRepay;
		mlsRate = mls.mlsRate;
	}

	// Net income after ATO
	income = Math.round(
		income - tax - helpRepay + helpOver - medicare - mlsRepay,
	);
	console.log(
		"Total Tax and Payments:",
		tax + helpRepay - helpOver + medicare + mlsRepay,
		"\nEach:",
		tax,
		helpRepay - helpOver,
		medicare,
		mlsRepay,
	);
	// 	console.log(
	// 		`Medicare Levy: ${medicare}
	// Tax: ${tax}
	// Medicare Levy Surcharge: ${mls}
	// Net Income: ${income}`,
	// 	);

	// are we adding to investments or drawing income from investments?
	let invContrib = 0;
	if (!drawingPhase) {
		invContrib = income - incomeObj.expenses;
	} else {
		invContrib = -(
			tax +
			helpRepay -
			helpOver +
			medicare +
			mlsRepay +
			incomeObj.expenses
		);
		//when in drawing phase, income is set to a fixed pre-tax number to cover expenses after tax, taken from investments
	}

	// update investments
	const newInv = growInv(incomeObj.invBal, invContrib, growth).invBal;

	// 	console.log(
	// 		`Investments: ${invContrib}
	// New Investment Balance: ${newInv}`,
	// 	);

	return {
		income: income,
		superContrib: supCont,
		helpRepay: helpRepay - helpOver,
		helpRate: helpRate,
		medicare: medicare,
		mlsRepay: mlsRepay,
		mlsRate: mlsRate,
		invContrib: invContrib,
		helpBal: helpBalance,
		superBal: newSuper,
		invBal: newInv,

		reportableSuper: repSup,
		baseTax: taxResult.baseTax,
		taxBracket: taxResult.taxBracket,
		totalTax: tax,
	};
}; // checked

export interface NetIncome
	extends NetWorth,
		TaxResult,
		SuperResult,
		HelpResult,
		MlsResult {
	superContrib: number;
	invContrib: number;
	medicare: number;
}

/**
 * A function that gives you the pre-tax income for a corresponding after-tax amount.
 * @param {number} targetIncome Desired post-tax income amount (usually to cover expenses)
 * @returns {number} The amount of pre-tax income required to earn the after tax target amount.
 */
export const preTaxTarget = (targetIncome: number): number => {
	let testAmt = 2 * targetIncome;
	let increment = targetIncome * 0.5;
	const tester = IncomeTaxProfile.create(testAmt, targetIncome);

	while (true) {
		let postTax = Math.round(taxTime(tester).income);

		if (postTax !== targetIncome) {
			if (postTax > targetIncome) {
				tester.income = Math.round(tester.income - increment);
				increment *= 0.5;
			} else {
				tester.income = Math.round(tester.income + increment);
			}
		} else {
			break;
		}
	}
	console.log("Pre-tax Income required for FIRE: ", tester);
	return tester.income;
}; // checked

/**
 * A function that gives you your goal FIRE number based on the 4% rule
 * @param {number} income Target annual income
 * @returns {number} Total investments required to draw annual income based on 4% rule
 */
export const fireNumber = (income: number): number => {
	return Math.round(income / 0.04);
}; // checked

/**
 * A function that checks if your investment balance is sufficient to drawdown your target income until retirement age (60)
 * @param {number} balance Investment balance being tested
 * @param {number} growth Assumed growth rate of investments from 0-1
 * @param {number} target Target income to draw down
 * @param {number} currentAge Age at which this balance is current
 * @returns {boolean} Whether balance is sufficient to sustain drawdown until 60
 */
export const invTargetReached = (
	balance: number,
	growth: number,
	target: number,
	currentAge: number,
): boolean => {
	let age = currentAge;
	let invBal = balance;

	while (age <= 60) {
		age += 1;
		const invGrowth = growInv(invBal, 0, growth).growth;
		const drawing = invGrowth > target ? invGrowth : target;
		invBal = (invBal - drawing) * (1 + growth / 100);

		// if at any point before reaching age 60, invBal reaches <0, then balance is insufficient
		if (invBal < 0) {
			return false;
		}
	}

	// if by age 60 balance is > 0, balance is sufficient
	return true;
}; // checked

/**
 * A function to check at what age your Super will reach your FIRE number without requiring further contributions
 * @param {number} balance Current Super balance
 * @param {number} expenses Estimated annual expenses once FIRE'd
 * @param {number} contrib Annual super contributions until ceased
 * @param {number} age Current age
 * @param {number} growth Assumed growth % as a value from 0-1
 * @returns {{ age: number, balance: number, fireNumber: number, balBy60: number}} Age, Super Balance, once sufficient to reach FIRE number with Super balance by 60 without further contributions
 */
export const superTarget = (
	balance: number,
	expenses: number,
	contrib: number,
	age: number,
	growth = 7,
) => {
	let year = 0;
	const target = fireNumber(expenses);

	// Balance by the age of 60 without further contributions
	let retireBal = balance * Math.pow((1 + growth / 100) * 0.85, 60 - age);

	// If super balance is not sufficient to reach target, increment by a year and contribute to super
	while (retireBal < target) {
		year += 1;
		age += 1;
		balance = updateSuper(balance, contrib, growth);
		retireBal = balance * Math.pow(1 + growth * 0.85, 60 - age);
	}

	return {
		age: age,
		balance: balance,
		fireNumber: target,
		balBy60: retireBal,
	};
}; // checked

export const compoundInterest = (
	principal: number,
	rate: number,
	contrib: number = 0,
	period: number = 1,
): number => {
	const result = principal * (1 + rate / 100) ** period;
	const contribs =
		(contrib * ((1 + rate / 100) ** period - 1)) / (rate / 100);
	return result + contribs;
};

/**
 * A function that returns your estimated years to reach FIRE and age based on current income/expenses/net worth.
 * @param {IncomeObject} incomeObj IncomeObject that contains your predictive properties for income etc.
 * @param {number} age Age at the start of prediction
 * @param {number} growth Assumed growth % as a value from 0-1
 * @returns {{years: number, age: number, incomeObj: IncomeObject}} Years to FIRE and Age at FIRE, along with IncomeObject at 60
 */
export const timeToFIRE = (
	incomeObj: IncomeTaxProfile,
	age: number,
	growth: number = 7,
): { result: IncomeTaxProfile; years: number; age: number } => {
	console.log("---------TTF IncomeObj passed: ", incomeObj); //change to income occurs between logs here
	const reqIncome = preTaxTarget(incomeObj.expenses);
	console.log("----After PTT:", incomeObj);
	const fireNum = fireNumber(reqIncome);
	const startAge = age;

	let year = 0;
	console.log("----Before Copy:", incomeObj);
	let yearEnd = new IncomeTaxProfile(
		new NetWorth(
			incomeObj.income,
			incomeObj.helpBal,
			incomeObj.superBal,
			incomeObj.invBal,
		),
		incomeObj.expenses,
		incomeObj.incl,
		incomeObj.rate,
		incomeObj.deductions,
		incomeObj.fringeBenefits,
		incomeObj.phi,
	);
	console.log("-------After Copy:", yearEnd);

	while (!invTargetReached(yearEnd.invBal, growth, reqIncome, age)) {
		year += 1;
		age += 1;
		console.log("Before TaxTime:", yearEnd);
		const netPosition = taxTime(yearEnd, false, growth, false, true);
		yearEnd.helpBal = netPosition.helpBal;
		yearEnd.invBal = netPosition.invBal;
		yearEnd.superBal = netPosition.superBal;
		// incomeObj.helpBal = yearEnd.helpBal;
		// incomeObj.helpBal = yearEnd.superBal;
		// incomeObj.helpBal = yearEnd.invBal;
		console.log("----INVESTMENTS:", yearEnd.invBal);

		console.log(
			`Age: ${age}
Investments Balance: ${yearEnd.invBal}
Super Balance: ${yearEnd.superBal}
HECS Balance: ${yearEnd.helpBal}
Invested this year: ${netPosition.invContrib}

`,
		);
	}

	console.log(`Investments will reach target balance at age ${age}.
Start max super contributions.`);
	const superFIRE = superTarget(
		yearEnd.superBal,
		yearEnd.expenses,
		27500,
		age,
		growth,
	);
	// console.log(
	// 	`Target super balance is ${superFIRE.balance} before contributions stop.
	//     FIRE number is ${superFIRE.fireNumber}.
	//     Super Balance will be ${superFIRE.balBy60} by 60.`,
	// );

	while (age < superFIRE.age + 1) {
		year += 1;
		age += 1;

		const netPosition = taxTime(yearEnd, true, growth, false, true);
		yearEnd.helpBal = netPosition.helpBal;
		yearEnd.superBal = netPosition.superBal;
		yearEnd.invBal = netPosition.invBal;

		console.log(
			`Age: ${age}
Investments Balance: ${yearEnd.invBal}
Super Balance: ${yearEnd.superBal}
HECS Balance: ${yearEnd.helpBal}
Invested this year: ${netPosition.invContrib}

`,
		);
	}

	const fireYears = year;
	console.log(`You will reach FIRE in ${year} years!`);

	yearEnd.income = reqIncome;
	yearEnd.deductions = 0;
	yearEnd.fringeBenefits = 0;
	yearEnd.incl = false;
	yearEnd.rate = 0;

	while (age < 60) {
		year += 1;
		age += 1;

		const netPosition = taxTime(yearEnd, false, growth, true, false);
		yearEnd.helpBal = netPosition.helpBal;
		yearEnd.superBal = netPosition.superBal;
		yearEnd.invBal = netPosition.invBal;

		console.log(
			`Age: ${age}
Investments Balance: ${yearEnd.invBal}
Super Balance: ${yearEnd.superBal}
HECS Balance: ${yearEnd.helpBal}
Invested this year: ${netPosition.invContrib}

`,
		);

		console.log(`Final Net Worth: ${yearEnd.invBal + yearEnd.superBal}`);
	}

	return {
		years: fireYears,
		age: startAge + fireYears,
		result: yearEnd,
	};
};
