import { $, component$ } from "@builder.io/qwik";
import * as styles from "~/components/styles/button.css";

export const Top = component$(() => {

	const startHandler = $(() => {
		
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
