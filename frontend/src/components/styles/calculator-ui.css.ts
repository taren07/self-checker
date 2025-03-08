import { style } from "@vanilla-extract/css";

export const styles = {
	container: style({
		width: "100%",
		maxWidth: "20rem",
		padding: "2rem",
		display: "grid",
		gap: "1rem",
		fontFamily: "Roboto, sans-serif",
	}),
	inputRow: style({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	}),
	backspaceButton: style({
		padding: "0.5rem",
		backgroundColor: "#f1f1f1",
		borderRadius: "0.5rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}),
	maskedInput: style({
		fontSize: "1.2rem",
		padding: "0.5rem",
		border: "none",
		borderRadius: "0.5rem",
		textAlign: "right",
	}),
	icon: style({
		width: "3rem",
		height: "3rem",
	}),
	buttonGrid: style({
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gap: "1rem",
		backgroundColor: "#f9f9f9",
		padding: "1rem",
		borderRadius: "0.5rem",
	}),
	numButton: style({
		backgroundColor: "#e0e0e0",
		fontSize: "1.5rem",
		fontWeight: "bold",
		padding: "1rem",
		textAlign: "center",
		borderRadius: "0.5rem",
	}),
	okButton: style({
		gridColumn: "span 2",
		backgroundColor: "#228b22",
		color: "#ffffff",
		fontSize: "1.5rem",
		fontWeight: "bold",
		borderRadius: "0.5rem",
		padding: "1rem",
		textAlign: "center",
	}),
};
