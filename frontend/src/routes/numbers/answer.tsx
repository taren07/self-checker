// Answer.tsx
import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { CalculatorUi } from "~/components/calculator-ui";
import { NumbersContext, NumbersStore } from "~/context/numbers";
import * as styles from "./styles/answer.css";

type AnswerStep = { _tag: "Answer"; correct: number[] };

export const Answer = component$(() => {
	const numbersContext = useContext(NumbersContext);
	const state = useStore({ startAt: Date.now() });

	const onSubmit = $((input: number[]) => {
		const duration = Date.now() - state.startAt;
		const newStep = {
			tag: "SubmitAnswer" as const,
			correct: [1, 2, 3],
			answer: [3, 2, 1],
			duration: duration,
		};
		numbersContext.step = newStep;
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
