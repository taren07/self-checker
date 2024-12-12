import {
	component$,
	useStore,
	createContextId,
	useContextProvider,
	useContext,
	useTask$,
	$,
} from "@builder.io/qwik";
import { numbersContextId } from "~/context/id";
import { Top } from "./top";
import { CountDown } from "./count-down";

export type NumbersStore = {
	step:
		| { tag: "Top" }
		| { tag: "CountDown" }
		| { tag: "CountDownFinished" }
		| { tag: "ShowDigit" }
		| { tag: "ShowDigitFinished" }
		| { tag: "Answer" }
		| { tag: "Result" };
	direction?: String;
	answerLength: Number;
	answers?: Array<Number>;
};

export const NumbersContext = createContextId<NumbersStore>(numbersContextId);

export const SwitchComponent = component$(() => {
	const numbersContext = useContext(NumbersContext);

	const onComplete = $(() => {
		numbersContext.step = { tag: "CountDownFinished" };
		numbersContext.answerLength = 3;
	});

	switch (numbersContext.step.tag) {
		case "Top":
			return <Top />;
		case "CountDown":
			return <CountDown onComplete={onComplete} />;
		case "ShowDigit":
			return <></>;
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