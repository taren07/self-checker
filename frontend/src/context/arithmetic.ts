import { createContextId } from "@builder.io/qwik";
import { arithmeticUiContextId, arithmeticActionContextId } from "./id";

export type ArithmeticActionState = {
	step: actionStep;
};

export type ArithmeticUiState = {
	step: uiStep;
};

/* eslint-disable no-mixed-spaces-and-tabs */
export type uiStep =
	| { tag: "StartTrial" }
	| { tag: "CountDownFinished" }
	| { tag: "CountDown" }
	| { tag: "ShowCalculator" }
	| { tag: "Complete" }
	| { tag: "NextTest" };

/* eslint-disable no-mixed-spaces-and-tabs */
export type actionStep =
	| { tag: "GenerateProblem" }
	| { tag: "ShowProblem"; problem: string; correct: number }
	| { tag: "SubmitAnswer"; correct: number; answer: number }
	| {
			tag: "Result";
			result: { tag: "correct" } | { tag: "wrong"; correct: number };
	  };

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

export function useActionReducer(
	context: ArithmeticActionState,
	action: actionStep
): ArithmeticActionState {
	switch (action.tag) {
		case "GenerateProblem":
			return {
				...context,
				step: {
					tag: "ShowProblem",
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
		default:
			throw new Error("Unhandled action type");
	}
}

export function useUiReducer(
	context: ArithmeticUiState,
	state: uiStep
): ArithmeticUiState {
	switch (state.tag) {
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
				},
			};
		case "Complete":
			return {
				...context,
				step: { tag: "NextTest" },
			};
		default:
			throw new Error("Unhandled action type");
	}
}

export const ArithmeticUiContext = createContextId<ArithmeticUiState>(
	arithmeticUiContextId
);

export const ArithmeticActionContext = createContextId<ArithmeticActionState>(
	arithmeticActionContextId
);