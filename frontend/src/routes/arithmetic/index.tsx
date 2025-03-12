import {
	$,
	component$,
	useContext,
	useContextProvider,
	useStore,
} from "@builder.io/qwik";
import { ArithmeticContext, reducer } from "~/context/arithmetic";
import type { ArithmeticState } from "~/context/arithmetic";
import { Top } from "./top";
import { CountDown } from "../numbers/count-down";
import * as styles from "../arithmetic/styles/show-problem.css";
import { CalculatorUi } from "~/components/calculator-ui";

export const Arithmetic = component$(() => {
	const arithmeticStore = useStore<ArithmeticState>({
		step: { tag: "Top" },
		problem: "",
		answer: 0,
		correct: 0,
		duration: 0,
	});
	useContextProvider(ArithmeticContext, arithmeticStore);
	const arithmeticContext = useContext(ArithmeticContext);

	const onComplete = $(() => {
		const state = reducer(arithmeticContext, { tag: "CountDownFinished" });
		arithmeticContext.step = state.step;
		arithmeticContext.problem = state.problem;
		arithmeticContext.correct = state.correct;
	});

	const onSubmit = $(() => {});

	return (
		<>
			{arithmeticContext.step.tag === "Top" && <Top />}
			{arithmeticContext.step.tag === "CountDown" && (
				<CountDown onComplete={onComplete} />
			)}
			<div class={styles.calculatorWrapper}>
				<CalculatorUi onSubmit={onSubmit} />
			</div>
		</>
	);
});

export default Arithmetic;
