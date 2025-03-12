import { $, component$, useContext } from "@builder.io/qwik";
import * as styles from "~/components/styles/button.css";
import { ArithmeticContext, reducer } from "~/context/arithmetic";

export const Top = component$(() => {
	const arithmeticContext = useContext(ArithmeticContext);

	const startHandler = $(() => {
		const state = reducer(arithmeticContext, { tag: "StartTrial" });
		arithmeticContext.step = state.step;
	});

	return (
		<main>
			<h1>計算力のチェック</h1>
			<p>表示される数字を暗算で回答してください</p>
			<button class={styles.button} onClick$={startHandler}>
				スタート
			</button>
		</main>
	);
});
