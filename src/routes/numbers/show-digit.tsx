import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { animate } from "motion";
import { useNumberDisplay } from "~/lib/useNumberDisplay";
import * as styles from "./styles/show-digit.css";

export const ShowDigit = component$(() => {
	const [number, { inc }] = useNumberDisplay();
	const containerRef = useSignal<Element>();

	const incQRL = $(() => inc());

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ track }) => {
		const container = track(() => containerRef.value);
		if (!container) return;

		animate(container, { opacity: [1, 1, 0, 0] } as any, {
			duration: 2,
			easings: "ease-in-out",
			times: [0, 0.75, 0.75, 1],
			onComplete: incQRL,
		});
	});

	return (
		<div class={styles.container}>
			<div ref={containerRef} key={number.id} class={styles.innerBox}>
				{number.number}
			</div>
		</div>
	);
});
