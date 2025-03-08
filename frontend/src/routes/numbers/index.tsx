import {
	component$,
	useStore,
	useContextProvider,
	useContext,
	$,
} from "@builder.io/qwik";
import { Top } from "./top";
import { CountDown } from "./count-down";
import { NumbersContext, reducer } from "~/context/numbers";
import type { NumbersState } from "~/context/numbers";
import { ShowDigit } from "./show-digit";
import { Answer } from "./answer";
import { Result } from "./result";

export const SwitchComponent = component$(() => {
	const numbersContext = useContext(NumbersContext);

	const onComplete = $(() => {
		const state = reducer(numbersContext, { tag: "CountDownFinished" });
		numbersContext.step = state.step;
		numbersContext.answerLength = state.answerLength;
		numbersContext.answers = state.answers;
		numbersContext.direction = state.direction;
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
			return <Result />;
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
