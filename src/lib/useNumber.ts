import { _sum, _average } from "ts-iterable-functions";
import invariant from "tiny-invariant";

let isInt = (n: number, message: string) =>
  invariant(Number.isInteger(n), message);

export let range = (start: number, end: number, step = 1): number[] => {
  isInt(start, "start isn't an integer.");
  isInt(end, "end isn't an integer.");
  isInt(step, "step isn't an integer.");
  invariant(start <= end, "start is greater than end.");
  invariant(step >= 1, "step is less than 1.");

  const ret = [];
  for (let i = start; i <= end; i = i + step) {
    ret.push(i);
  }
  return ret;
};

export let randomInt = (maxExclusive: number): number => {
  isInt(maxExclusive, "maxExclusive isn't an integer.");
  return Math.floor(Math.random() * maxExclusive);
};

export let sum = (list: number[]) => (list.length ? _sum(list) : 0);

export let average = (list: number[]) => (list.length ? _average(list) : 0);
