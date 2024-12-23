import { createContextId } from "@builder.io/qwik";
import { numbersContextId } from "./id";

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

export type state = {
	direction: direction;
	step: step;
	answerLength: number;
	answers: answer[];
};

export type NumbersStore = {
	step: step;
	direction?: direction;
	answerLength: Number;
	answers?: answer[];
};

export const NumbersContext = createContextId<NumbersStore>(numbersContextId);
