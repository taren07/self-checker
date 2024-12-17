import { style } from "@vanilla-extract/css";

export const container = style({
	width: "100%",
	height: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const innerBox = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#f3f4f6",
	color: "#1a202c",
	fontSize: "70px",
	fontFamily: "Roboto, sans-serif",
	width: "11rem",
	height: "11rem",
	borderRadius: "50%",
});
