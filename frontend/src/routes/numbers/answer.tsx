// Answer.tsx
import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { CalculatorUi } from "~/components/calculator-ui";
import { submitAnswerStep, NumbersContext, reducer } from "~/context/numbers";
import * as styles from "./styles/answer.css";

export const Answer = component$(() => {
	const numbersContext = useContext(NumbersContext);
	const step = numbersContext.step as submitAnswerStep;
	const state = useStore({ startAt: Date.now() });

	const onSubmit = $((input: number[]) => {
		const duration = Date.now() - state.startAt;
		const submitData = reducer(numbersContext, {
			tag: "SubmitAnswer",
			correct: step.correct,
			answer: input,
			duration,
		});

		numbersContext.step = submitData.step;
		numbersContext.answerLength = submitData.answerLength;
		numbersContext.answers = submitData.answers;
		numbersContext.direction = submitData.direction;
	});

	return (
		<div class={styles.container}>
			<div class={styles.textContainer}>
				<div>
					<div>覚えた数字を、</div>
					<div>
						表示された順番とは
						<div>逆の順番</div>で
					</div>
					<div>回答してください</div>
				</div>
			</div>
			<div class={styles.calculatorWrapper}>
				<CalculatorUi onSubmit={onSubmit} />
			</div>
		</div>
	);
});
