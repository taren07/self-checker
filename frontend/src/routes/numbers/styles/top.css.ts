import { style } from "@vanilla-extract/css";

export const startButton = style({
    width: "210px",
    padding: "0.75rem 1rem",
    gap: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    borderRadius: "1.5rem",
    border: "1px solid transparent",
    backgroundColor: "#14b8a6",
    color: "#fff",
    cursor: "pointer",
    selectors: {
        "&:hover": {
            backgroundColor: "#0d9488",
        },
        "&:focus": {
            outline: "none",
            backgroundColor: "#0d9488",
        },
        "&:disabled": {
            opacity: 0.5,
            pointerEvents: "none",
        },
    },
});