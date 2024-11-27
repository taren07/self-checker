import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import * as styles from "./index.css";

export default component$(() => {
	const nav = useNavigate();

	return (
		<div style={{ textAlign: "center" }}>
			<button class={styles.startButton} onClick$={() => nav("/numbers")}>
				はじめる
			</button>
		</div>
	);
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
