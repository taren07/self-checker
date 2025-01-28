import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import * as styles from "./styles/count-down.css";

const totalCount = 3;
const countDownInterval = 700;

type Props = {
	onComplete: () => void;
};

export const CountDown = component$(({ onComplete }: Props) => {
	const count = useSignal(0);

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(() => {
		const interval = setInterval(() => {
			if (count.value + 1 < totalCount) {
				count.value += 1;
			} else {
				clearInterval(interval);
				onComplete();
			}
		}, countDownInterval);

		return () => clearInterval(interval);
	});

	return (
		<div class={styles.container}>
			{Array.from({ length: totalCount }).map((_, index) => (
				<div
					key={index}
					class={`${styles.circle} ${
						index <= count.value ? styles.activeCircle : styles.inactiveCircle
					}`}
				/>
			))}
		</div>
	);
});
