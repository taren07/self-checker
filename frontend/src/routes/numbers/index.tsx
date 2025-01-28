import {
	component$,
	useStore,
	useContextProvider,
	useContext,
	$,
	useVisibleTask$,
} from "@builder.io/qwik";
import { Top } from "./top";
import { CountDown } from "./count-down";
import { NumbersContext, reducer } from "~/context/numbers";
import type { NumbersState } from "~/context/numbers";
import { ShowDigit } from "./show-digit";
import { Answer } from "./answer";

export const SwitchComponent = component$(() => {
	const numbersContext = useContext(NumbersContext);

	const onComplete = $(() => {
		numbersContext.step = { tag: "CountDownFinished" };
		numbersContext.answerLength = 3;
	});

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ track }) => {
		const step = track(() => numbersContext.step);
		if (step.tag == "CountDownFinished") {
			const state = reducer(numbersContext, { tag: "CountDownFinished" });
			numbersContext.step = state.step;
			numbersContext.answerLength = state.answerLength;
			numbersContext.answers = state.answers;
			numbersContext.direction = state.direction;
		}
	});

	switch (numbersContext.step.tag) {
		case "Top":
			return <Top />;
		case "CountDown":
			return <CountDown onComplete={onComplete} />;
		case "ShowDigit":
			return <ShowDigit />;
		case "Answer":
			return <Answer />;
		case "Result":
			return <></>;
	}
});

export const DigitSpanBackward = component$(() => {
	const numbersStore = useStore<NumbersState>({
		step: { tag: "Top" },
		direction: "backward",
		answerLength: 3,
		answers: [],
	});
	useContextProvider(NumbersContext, numbersStore);

	return <SwitchComponent />;
});

export default DigitSpanBackward;
