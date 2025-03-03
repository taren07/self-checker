
import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { LuCheck, LuX } from "@qwikest/icons/lucide";

import { Spinner } from "~/components/spinner";
import { NumbersContext, reducer } from "~/context/numbers";
import { resultStyles } from "./styles/result.css";

type ResultStep = {
	tag: "Result";
	result: { tag: "correct" } | { tag: "wrong"; correct: number[] };
};

type Answer = {
	answer: number[];
	correct: number[];
	duration: number;
};

type ResultData = {
	correctlyAnsweredLength: number;
	answers: Answer[];
};

export const Result = component$(() => {
	const initialAnswerLength = 3;
	const maxAnswerLength = 10;
	const numbersContext = useContext(NumbersContext);
	const navigate = useNavigate();
	const current = numbersContext.step as ResultStep;
	const nextLen = numbersContext.answerLength + 1;
	const correct = current.result.tag === "correct";
	const toBeContinued = correct && nextLen < maxAnswerLength;
	const store = useStore({ submitting: false });

	const correctlyAnsweredLength = (() => {
		if (numbersContext.answerLength === initialAnswerLength) {
			return 0;
		} else if (numbersContext.answerLength === maxAnswerLength && correct) {
			return maxAnswerLength;
		} else {
			return numbersContext.answerLength - 1;
		}
	})();

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

	const result: ResultData = {
		correctlyAnsweredLength,
		answers: numbersContext.answers,
	};

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
					<>
						<input
							type="hidden"
							name="resultData"
							value={JSON.stringify(result)}
						/>
						<button type="submit">次へ</button>
					</>
				)}

				{store.submitting && <Spinner />}
			</div>
		</div>
	);
});
