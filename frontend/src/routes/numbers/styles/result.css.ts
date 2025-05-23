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
		height: "8rem",
		color: "#228B22",
	}),
	messageBox: style({
		fontSize: "25px",
		fontWeight: "bold",
		textAlign: "center",
		paddingBottom: "56px",
	}),
	wrongMessage: style({
		paddingTop: "25px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "20px",
	}),
};
