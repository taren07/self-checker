import {
	component$,
	useStore,
	useContextProvider,
	useContext,
	$,
} from "@builder.io/qwik";
import { Top } from "./top";
import { CountDown } from "./count-down";
import { NumbersContext, NumbersStore } from "~/context/numbers";
import { ShowDigit } from "./show-digit";

export const SwitchComponent = component$(() => {
	const numbersContext = useContext(NumbersContext);

	const onComplete = $(() => {
		numbersContext.step = { tag: "ShowDigit", correct: [1, 2, 3] };
		numbersContext.answerLength = 3;
	});

	switch (numbersContext.step.tag) {
		case "Top":
			return <Top />;
		case "CountDown":
			return <CountDown onComplete={onComplete} />;
		case "ShowDigit":
			return <ShowDigit />;
		case "Answer":
			return <></>;
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
