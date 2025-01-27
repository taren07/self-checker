import {
	component$,
	useStore,
	useContextProvider,
	useContext,
	$,
	useTask$,
} from "@builder.io/qwik";
import { Top } from "./top";
import { CountDown } from "./count-down";
import { NumbersContext, NumbersStore, reducer } from "~/context/numbers";
import { ShowDigit } from "./show-digit";
import { Answer } from "./answer";

export const SwitchComponent = component$(() => {
	const numbersContext = useContext(NumbersContext);

	console.log(numbersContext.step);

	const onComplete = $(() => {
		numbersContext.step = { tag: "CountDownFinished" };
		numbersContext.answerLength = 3;
	});

	useTask$(({ track }) => {
		const step = track(() => numbersContext.step);
		if (step.tag === "CountDownFinished") {
			reducer(numbersContext, { tag: "CountDownFinished" });
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
	const numbersStore = useStore<NumbersStore>({
		step: { tag: "Top" },
		direction: "backward",
		answerLength: 3,
		answers: [],
	});
	useContextProvider(NumbersContext, numbersStore);

	return <SwitchComponent />;
});

export default DigitSpanBackward;
