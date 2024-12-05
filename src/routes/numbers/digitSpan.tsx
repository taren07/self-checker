import {
	component$,
	useStore,
	createContextId,
	useContextProvider,
} from "@builder.io/qwik";
import { numbersContextId } from "~/context/id";

export type NumbersStore = {
	step: Object;
	direction: String;
	answerLength: Number;
	answers: Array<Number>;
};

export const NumbersContext = createContextId<NumbersStore>(numbersContextId);

export const DigitSpan = component$(() => {
	const numbersStore = useStore<NumbersStore>({
		step: { tag: "Top" },
		direction: "backward",
		answerLength: 0,
		answers: [],
	});
	useContextProvider(NumbersContext, numbersStore);

	return <></>;
});
