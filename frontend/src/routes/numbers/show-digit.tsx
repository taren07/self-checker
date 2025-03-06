import {
	$,
	component$,
	useContext,
	useSignal,
	useVisibleTask$,
} from "@builder.io/qwik";
import { animate } from "motion";
import { useNumberDisplay } from "~/lib/useNumberDisplay";
import * as styles from "./styles/show-digit.css";
import { NumbersContext, reducer } from "~/context/numbers";

export const ShowDigit = component$(() => {
	const numbersContext = useContext(NumbersContext);
	const [number, { inc }] = useNumberDisplay();
	const containerRef = useSignal<Element>();

	// eslint-disable-next-line qwik/valid-lexical-scope
	const incQRL = $(() => inc());

	const proceed = $(() => {
		if (numbersContext.answers.length > 1) {
			const state = reducer(numbersContext, {
				tag: "ShowDigitFinished",
				correct: numbersContext.answers[1].correct,
			});
			numbersContext.step = state.step;
			numbersContext.answerLength = state.answerLength;
			numbersContext.answers = state.answers;
			numbersContext.direction = state.direction;
		} else {
			console.error("answers 配列の長さが不足しています");
		}
	});

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup, track }) => {
		const container = track(() => containerRef.value);
		if (!container) return;

		const animation = animate(container, { opacity: [1, 1, 0, 0] } as any, {
			duration: 2,
			ease: "easeInOut",
			times: [0, 0.75, 0.75, 1],
			onComplete: incQRL,
		});

		animation.then(proceed);

		cleanup(() => animation.cancel());
	});

	return (
		<div class={styles.container}>
			<div ref={containerRef} key={number.id} class={styles.innerBox}>
				{number.number}
			</div>
		</div>
	);
});
