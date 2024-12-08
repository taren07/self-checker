import {
	component$,
	useStore,
	createContextId,
	useContextProvider,
	useContext,
} from "@builder.io/qwik";
import { numbersContextId } from "~/context/id";
import { Top } from "./top";

export type NumbersStore = {
	step:
		| { tag: "Top" }
		| { tag: "CountDown" }
		| { tag: "CountDownFinished" }
		| { tag: "ShowDigit" }
		| { tag: "Answer" }
		| { tag: "Result" };
	direction: String;
	answerLength: Number;
	answers: Array<Number>;
};

export const NumbersContext = createContextId<NumbersStore>(numbersContextId);

export const DigitSpanBackward = component$(() => {
	const numbersContext = useContext(NumbersContext);
	const numbersStore = useStore<NumbersStore>({
		step: { tag: "Top" },
		direction: "backward",
		answerLength: 3,
		answers: [],
	});
	useContextProvider(NumbersContext, numbersStore);

	switch (numbersStore.step.tag) {
		case "Top":
			return <Top />;
		case "CountDown":
			return <></>;
		case "ShowDigit":
			return <></>;
		case "Answer":
			return <></>;
		case "Result":
			return <></>;
	}

	return <></>;
});
