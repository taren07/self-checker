import { style, keyframes } from "@vanilla-extract/css";

const spin = keyframes({
	from: { transform: "rotate(0deg)" },
	to: { transform: "rotate(360deg)" },
});

export const spinnerStyle = style({
	width: "4rem",
	height: "4rem",
	borderRadius: "50%",
	border: "4px solid rgba(0, 0, 0, 0.1)",
	borderTopColor: "#000",
	animation: `${spin} 1s linear infinite`,
});
