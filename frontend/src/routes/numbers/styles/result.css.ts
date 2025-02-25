import { style } from "@vanilla-extract/css";

export const resultStyles = {
	container: style({
		width: "100%",
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	}),
	icon: style({
		width: "8rem",
		color: "#228B22", // forest color
	}),
	messageBox: style({
		fontSize: "20px",
		fontWeight: "bold",
		textAlign: "center",
		paddingBottom: "56px",
	}),
	wrongMessage: style({
		paddingTop: "24px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "20px",
	}),
};
