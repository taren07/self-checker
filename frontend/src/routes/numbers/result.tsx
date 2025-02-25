
import { component$, useContext, useStore } from "@builder.io/qwik";
import { Form, useNavigate } from "@builder.io/qwik-city";
import { CheckIcon, XIcon } from "@qwikest/icons";
import { BoxedText } from "~/components/BoxedText";
import { Backdrop } from "~/components/Backdrop";
import { Spinner } from "~/components/Spinner";
import { Button } from "~/components/Button";
import { maxAnswerLength, initialAnswerLength } from "./index";
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

	const result: ResultData = {
		correctlyAnsweredLength,
		answers: numbersContext.answers,
	};

	return (
		<div class={resultStyles.container}>
			{correct ? (
				<CheckIcon class={resultStyles.icon} />
			) : (
				<XIcon class={resultStyles.icon} />
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
						<BoxedText>
							{current.result.tag === "wrong" && current.result.correct.map(String).join(", ")}
						</BoxedText>
					</div>
				)}
			</div>
			<div>
				{toBeContinued ? (
					<Button
						onClick$={() =>
							reducer(numbersContext, { tag: "StartTrial", answerLength: nextLen })
						}
					>
						次へ
					</Button>
				) : (
					// <Form
					// 	method="post"
					// 	action="/submit"
					// 	onSubmit$={() => {
					// 		store.submitting = true;
					// 	}}
					// >
						<>
						<input
							type="hidden"
							name="resultData"
							value={JSON.stringify(result)}
						/>
						<Button type="submit">次へ</Button>
						</>
					// </Form>
				)}
				{store.submitting && (
					<Backdrop>
						<Spinner />
					</Backdrop>
				)}
			</div>
		</div>
	);
});
