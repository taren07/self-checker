
import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { LuCheck, LuX } from "@qwikest/icons/lucide";

import { Spinner } from "~/components/spinner";
import { NumbersContext, reducer } from "~/context/numbers";
import { resultStyles } from "./styles/result.css";

type ResultStep = {
	tag: "Result";
	result: { tag: "correct" } | { tag: "wrong"; correct: number[] };
};

export const Result = component$(() => {
	const maxAnswerLength = 10;
	const numbersContext = useContext(NumbersContext);
	const current = numbersContext.step as ResultStep;
	const nextLen = numbersContext.answerLength + 1;
	const correct = current.result.tag === "correct";
	const toBeContinued = correct && nextLen < maxAnswerLength;
	const store = useStore({ submitting: false });

	const nextStep = $(() => {
		numbersContext.answerLength = nextLen;
		const nextData = reducer(numbersContext, {
			tag: "CountDownFinished",
		});
		numbersContext.step = nextData.step;
		numbersContext.direction = nextData.direction;
		numbersContext.answers = nextData.answers;
		numbersContext.answerLength = nextData.answerLength;
	});

	const completeStep = $(() => {
		const nextData = reducer(numbersContext, {
			tag: "Complete",
		});
		numbersContext.step = nextData.step;
		numbersContext.direction = nextData.direction;
		numbersContext.answers = nextData.answers;
		numbersContext.answerLength = nextData.answerLength;
	});

	return (
		<div class={resultStyles.container}>
			{correct ? (
				<LuCheck class={resultStyles.icon} />
			) : (
				<LuX class={resultStyles.icon} />
			)}
			<div class={resultStyles.messageBox}>
				{correct ? (
					<p>
						正解です！
						<br />
						できるだけ多くの桁数に挑戦してみましょう。
					</p>
				) : (
					<div class={resultStyles.wrongMessage}>
						<p>正解は</p>
						{current.result.tag === "wrong" &&
							current.result.correct.map(String).join(", ")}
					</div>
				)}
			</div>
			<div>
				{toBeContinued ? (
					<button onClick$={nextStep}>次へ</button>
				) : (
					<button onClick$={completeStep}>もう一度チャレンジする</button>
				)}

				{store.submitting && <Spinner />}
			</div>
		</div>
	);
});
