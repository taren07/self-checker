import { useSignal, useComputed$, useTask$, useContext, $ } from '@builder.io/qwik';
import { reversed } from "./useArray";
import { NumbersContext, showDigitFinishedStep } from "../context/numbers";
// import invariant from "tiny-invariant";

type ShowDigitStep = {
	correct: number[];
};

type NumberDisplay = {
	id: number;
	number: number;
};

export const useNumberDisplay = (): [NumberDisplay, { inc: () => void }] => {
	const numbersContext = useContext(NumbersContext);
	const step = numbersContext.step as ShowDigitStep;
	const showDigitFinished = numbersContext.step as showDigitFinishedStep;

	const stepIndex = useSignal(0);
	const correct = useComputed$(() => step.correct);

	const numbersToDisplay = useComputed$(() => {
		return numbersContext.direction === "forward"
			? correct.value
			: reversed(correct.value);
	});

	useTask$(({ track }) => {
		const index = track(() => stepIndex.value);
		if (index === numbersToDisplay.value.length) {
			showDigitFinished.tag = "Answer";
			showDigitFinished.correct = correct.value;
		}
	});

	const number = useComputed$(() => {
		const id = Math.floor(Math.random() * 1000);
		const num = numbersToDisplay.value[stepIndex.value];
		if (num === undefined) {
			return { id, number: 0 };
		}
		// invariant(num === undefined, "number is undefined");
		return { id, number: num };
	});

	const inc = $(() => {
		if (stepIndex.value === numbersToDisplay.value.length) {
			return;
		}
		stepIndex.value += 1;
	});
	return [number.value, { inc }] as const;
};
