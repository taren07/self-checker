import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { NumbersContext, NumbersStore } from ".";

export const Top = component$(() => {
	const numbersContext = useContext(NumbersContext);

	const startHandler = $(() => {
		numbersContext.step = { tag: "CountDown" };
		numbersContext.answerLength = 3;
	});

	return (
		<main>
			<h1>記憶力のチェック</h1>
			<p>表示される数字を覚えて</p>
			<p>表示された順番とは逆の順番で回答してください</p>
			<button onClick$={startHandler}>スタート</button>
		</main>
	);
});
