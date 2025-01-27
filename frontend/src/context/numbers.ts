import { createContextId } from "@builder.io/qwik";
import { numbersContextId } from "./id";
import { randomInt, range } from "~/lib/useNumber";

export type direction = "forward" | "backward";

export type answer = {
	answer: number[];
	correct: number[];
	duration: number;
};

export type showDigitStep = { tag: "ShowDigit"; correct: number[] };
export type answerStep = { tag: "Answer"; correct: number[] };
export type resultStep = {
	tag: "Result";
	result: { tag: "correct" } | { tag: "wrong"; correct: number[] };
};
export type showDigitFinishedStep = {
	tag: "Answer";
	correct: number[];
};
export type submitAnswerStep = {
	tag: "SubmitAnswer";
	correct: number[];
	answer: number[];
	duration: number;
};

export type step =
	| { tag: "Top"; correct?: number[] }
	| { tag: "CountDown"; correct?: number[] }
	| { tag: "StartTrial"; answerLength: number }
	| { tag: "CountDownFinished" }
	| showDigitFinishedStep
	| submitAnswerStep
	| showDigitStep
	| answerStep
	| resultStep;

export type State = {
	direction: direction;
	step: step;
	answerLength: number;
	answers: answer[];
};

export type Action =
	| { tag: "StartTrial"; answerLength: number }
	| { tag: "CountDownFinished" }
	| { tag: "ShowDigitFinished"; correct: number[] }
	| {
			tag: "SubmitAnswer";
			answer: number[];
			correct: number[];
			duration: number;
	  };

export type NumbersStore = {
	step: step;
	direction?: direction;
	answerLength: Number;
	answers?: answer[];
};

function generateAnswer(len: number): number[] {
	return range(0, len - 1).map(() => randomInt(10));
}

function checkAnswer(correct: number[], answer: number[]): boolean {
	if (correct.length !== answer.length) return false;
	return correct.every((val, idx) => val === answer[idx]);
}

export function reducer(state: State, action: Action): State {
	switch (action.tag) {
		case "StartTrial":
			return {
				...state,
				answerLength: action.answerLength,
				step: { tag: "CountDown" },
			};
		case "CountDownFinished":
			return {
				...state,
				step: {
					tag: "ShowDigit",
					correct: generateAnswer(state.answerLength),
				},
			};
		case "ShowDigitFinished":
			return {
				...state,
				step: {
					tag: "Answer",
					correct: action.correct,
				},
			};
		case "SubmitAnswer":
			return {
				...state,
				answers: state.answers.concat([
					{
						answer: action.answer,
						correct: action.correct,
						duration: action.duration,
					},
				]),
				step: {
					tag: "Result",
					result: checkAnswer(action.correct, action.answer)
						? { tag: "correct" }
						: { tag: "wrong", correct: action.correct },
				},
			};
		default:
			throw new Error("Unhandled action type");
	}
}


export const NumbersContext = createContextId<NumbersStore>(numbersContextId);
export const NumbersStateContext = createContextId<State>(
	"NumbersStateContext"
);
export const NumbersDispatchContext = createContextId<(action: Action) => void>(
	"NumbersDispatchContext"
);
