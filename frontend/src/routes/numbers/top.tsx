import { $, component$, useContext } from "@builder.io/qwik";
import { NumbersContext } from "~/context/numbers";
import * as styles from "./styles/top.css";
// import { CalculatorUi } from "~/components/calculator-ui";
// import * as style from "./styles/answer.css";

export const Top = component$(() => {
	const numbersContext = useContext(NumbersContext);

	const startHandler = $(() => {
		numbersContext.step = { tag: "CountDown" };
		numbersContext.answerLength = 3;
	});

	// const onSubmit = $(() => {});

	return (
		<main>
			<h1>記憶力のチェック</h1>
			<p>表示される数字を覚えて</p>
			<p>表示された順番とは逆の順番で回答してください</p>
			<button class={styles.startButton} onClick$={startHandler}>
				スタート
			</button>
			{/* <div class={style.calculatorWrapper}>
				<CalculatorUi onSubmit={onSubmit} />
			</div> */}
		</main>
	);
});
