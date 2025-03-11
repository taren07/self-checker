import { createContextId } from "@builder.io/qwik";
import { arithmeticContextId } from "./id";

export type ArithmeticState = {
	step: step;
	answer: number;
	correct: number;
	duration: number;
};
export type step =
	| { tag: "Top" }
	| { tag: "ShowCalculator" }
	| { tag: "SubmitAnswer" }
	| { tag: "Result" };

export const ArithmeticContext =
	createContextId<ArithmeticState>(arithmeticContextId);

export function generateMathProblem(): { problem: string; answer: number } {
	const num1 = Math.floor(Math.random() * 90) + 10;
	const num2 = Math.floor(Math.random() * 90) + 10;
	const operators = ["+", "-", "*"];
	const operator = operators[Math.floor(Math.random() * operators.length)];

	let answer: number = 0;
	switch (operator) {
		case "+":
			answer = num1 + num2;
			break;
		case "-":
			answer = num1 - num2;
			break;
		case "*":
			answer = num1 * num2;
			break;
	}

	return {
		problem: `${num1} ${operator} ${num2} = ?`,
		answer,
	};
}