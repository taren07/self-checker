import { component$, useStore } from "@builder.io/qwik";
import { range } from "~/lib/useNumber";
import { styles } from "./styles/calculator-ui.css";

type Props = {
	onSubmit: (values: number[]) => void;
};
export const CalculatorUi = component$(({ onSubmit }: Props) => {
	const state = useStore({
		input: [] as number[],
	});

	const appendInput = (value: number) => {
		state.input = [...state.input, value];
	};

	const popInput = () => {
		state.input = state.input.slice(0, -1);
	};

	const handleSubmit = () => {
		onSubmit(state.input);
		state.input = [];
	};

	const maskedInput = state.input.map((n) => n.toString()).join(", ");

	return (
		<div class={styles.container}>
			<div class={styles.inputRow}>
				<div>{maskedInput}</div>
				<button class={styles.backspaceButton} onClick$={popInput}>
					{/* <BackspaceIcon class={styles.icon} /> */}
				</button>
			</div>

			<div class={styles.buttonGrid}>
				{range(1, 9)
					.concat([0])
					.map((n) => (
						<button
							key={n}
							class={styles.numButton}
							onClick$={() => appendInput(n)}
						>
							{n}
						</button>
					))}

				<button
					type="button"
					disabled={!state.input.length}
					onClick$={handleSubmit}
					class={styles.okButton}
				>
					OK
				</button>
			</div>
		</div>
	);
});
