import { createContextId } from "@builder.io/qwik";
import { arithmeticContextId } from "./id";

export type ArithmeticState = {
	step: step;
	problem: string;
	answer: number;
	correct: number;
	duration: number;
};

/* eslint-disable no-mixed-spaces-and-tabs */
export type step =
	| { tag: "Top" }
	| { tag: "CountDown" }
	| { tag: "ShowCalculator"; problem: string; correct: number }
	| {
			tag: "Result";
			result: { tag: "correct" } | { tag: "wrong"; correct: number };
	  };

/* eslint-disable no-mixed-spaces-and-tabs */
export type Action =
	| { tag: "StartTrial" }
	| {
			tag: "CountDownFinished";
			answer: number;
			correct: number;
			duration: number;
	  }
	| { tag: "SubmitAnswer"; correct: number; answer: number }
	| { tag: "NextTrial" }
	| { tag: "Complete" };

export const ArithmeticContext =
	createContextId<ArithmeticState>(arithmeticContextId);

export function generateMathProblem(): { problem: string; correct: number } {
	const num1 = Math.floor(Math.random() * 90) + 10;
	const num2 = Math.floor(Math.random() * 90) + 10;
	const operators = ["+", "-", "*"];
	const operator = operators[Math.floor(Math.random() * operators.length)];

	let correct: number = 0;
	switch (operator) {
		case "+":
			correct = num1 + num2;
			break;
		case "-":
			correct = num1 - num2;
			break;
		case "*":
			correct = num1 * num2;
			break;
	}

	return {
		problem: `${num1} ${operator} ${num2} = ?`,
		correct,
	};
}

function checkAnswer(answer: number, correct: number): boolean {
	return answer === correct;
}

export function reducer(
	context: ArithmeticState,
	action: Action
): ArithmeticState {
	switch (action.tag) {
		case "StartTrial":
			return {
				...context,
				step: { tag: "CountDown" },
			};
		case "CountDownFinished":
			return {
				...context,
				step: {
					tag: "ShowCalculator",
					problem: generateMathProblem().problem,
					correct: generateMathProblem().correct,
				},
			};
		case "SubmitAnswer":
			return {
				...context,
				step: {
					tag: "Result",
					result: checkAnswer(action.answer, context.correct)
						? { tag: "correct" }
						: { tag: "wrong", correct: context.correct },
				},
			};
		case "NextTrial":
	}
}