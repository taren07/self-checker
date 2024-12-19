import { reverse, toArray } from "ts-iterable-functions";
import { pipeInto } from "ts-functional-pipe";
import invariant from "tiny-invariant";
import { randomInt } from "./useNumber";

export let reversed = <T>(list: T[]): T[] =>
	pipeInto(list, reverse(), toArray());

export let chooseRandomly = <T>(list: T[]) => {
	invariant(list.length, "Can't randomly choose an item from an empty list.");
	return list[randomInt(list.length)];
};
