import { style } from "@vanilla-extract/css";

export const container = style({
	width: "100%",
	height: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "16px",
});

export const circle = style({
	height: "10px",
	width: "10px",
	borderRadius: "50%",
	transition: "background-color 150ms, opacity 150ms",
});

export const activeCircle = style({
	backgroundColor: "#1EAF7D",
	opacity: 1,
});

export const inactiveCircle = style({
	backgroundColor: "#C0C0C0",
	opacity: 0.5,
});
