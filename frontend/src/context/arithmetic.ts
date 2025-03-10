import { createContextId } from "@builder.io/qwik";
import { arithmeticContextId } from "./id";

export type ArithmeticState = {
    step: step;
    answer: number;
    correct: number;
    duration: number;
};
export type step = { tag: "Top" } | { tag: "ShowCalculator" }
| { tag: "SubmitAnswer" } | { tag: "Result" };


export const ArithmeticContext = createContextId<ArithmeticState>(
    arithmeticContextId
);