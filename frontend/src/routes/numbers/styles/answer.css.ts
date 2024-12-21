// styles.css.ts
import { style } from "@vanilla-extract/css";

export const container = style({
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "2rem",
	"@media": {
		"(max-width: 640px)": {
			gap: "1rem",
		},
	},
});

export const textContainer = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	textAlign: "center",
	gap: "1rem",
});

export const calculatorWrapper = style({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});
