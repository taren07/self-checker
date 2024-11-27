import { component$ } from "@builder.io/qwik";

export const Top = component$(() => {
	return (
		<main>
			<h1>記憶力のチェック</h1>
			<p>表示される数字を覚えて</p>
			<p>表示された順番とは逆の順番で回答してください</p>
		</main>
	);
});
