import {
	$,
	component$,
	useContext,
	useContextProvider,
	useStore,
} from "@builder.io/qwik";
import {
	ArithmeticUiContext,
	ArithmeticActionContext,
	useActionReducer,
	useUiReducer,
} from "~/context/arithmetic";
import type {
	ArithmeticUiState,
	ArithmeticActionState,
} from "~/context/arithmetic";
import { Top } from "./top";
import { CountDown } from "../numbers/count-down";
import * as styles from "../arithmetic/styles/show-problem.css";
import { CalculatorUi } from "~/components/calculator-ui";

export const Arithmetic = component$(() => {
	const uiStore = useStore<ArithmeticUiState>({
		step: { tag: "StartTrial" },
	});
	const actionStore = useStore<ArithmeticActionState>({
		step: { tag: "GenerateProblem" },
	});

	useContextProvider(ArithmeticUiContext, uiStore);
	useContextProvider(ArithmeticActionContext, actionStore);
	const uiContext = useContext(ArithmeticUiContext);
	const actionContext = useContext(ArithmeticActionContext);

	const onComplete = $(() => {
		const state = useUiReducer(uiContext, {
			tag: "CountDownFinished",
		});
		uiContext.step = state.step;
	});

	const onSubmit = $(() => {
		const state = useActionReducer(actionContext, {
			tag: "SubmitAnswer",
			answer: [0],
		});
		actionContext.step = state.step;
	});

	return (
		<>
			{uiContext.step.tag === "Top" && <Top />}
			{uiContext.step.tag === "CountDown" && (
				<CountDown onComplete={onComplete} />
			)}
			{uiContext.step.tag === "ShowCalculator" && (
				<div class={styles.calculatorWrapper}>
					<CalculatorUi onSubmit={onSubmit} />
				</div>
			)}
		</>
	);
});

export default Arithmetic;
