const alignCenter = {
	display: "flex",
	alignItems: "center",
};

const styles = {
	card: {
		...alignCenter,
		flexDirection: "column",
		bgcolor: "transparent",
		boxShadow: "none",
		maxWidth: 540,
		width: "100%",
		paddingTop: "10px",
	},
	mediaBox: {
		position: "relative" as const,
		border: "3px solid #fff",
		borderRadius: "6px",
		maxWidth: 200,
		zIndex: 100,
		mb: "48px",
		"&::before": {
			content: '""',
			position: "absolute",
			zIndex: 1,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			transform: "rotate(-10deg)",
			border: "1px solid #9A98EF",
			borderRadius: "8px",
		},
		"&::after": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			transform: "rotate(10deg)",
			border: "1px solid #FAC6D3",
			borderRadius: "8px",
		},
	},
	media: {
		position: "relative" as const,
		width: "100%",
		height: "auto",
		maxHeight: "230px",
		bgcolor: "custom.black",
		zIndex: 50,
	},
	contentBox: {
		...alignCenter,
		justifyContent: "space-between",
		width: "100%",
		padding: 0,
		mb: "48px",
	},
	titleBox: {
		...alignCenter,
		justifyContent: "center",
	},
	title: {
		mr: "14px",
	},
	tooltip: {},
	tooltipBtn: {
		borderColor: "#404040",
		padding: "6px 10px",
	},
	tooltipText: {
		textTransform: "none",
		mr: "6px",
	},
	tooltipIcon: {
		width: "14px",
		color: "#A2A2A2",
	},
	actionsBox: {
		bgcolor: "success.main",
		padding: "32px",
		width: "100%",
		borderRadius: "6px",
		mb: "16px",
	},
	// walletBtn: {
	// 	background: "linear-gradient(90deg, #FBC7D4 0%, #9796F0 100%), #4AAF47",
	// 	padding: "20px 0",
	// },
	// walletBtnText: { fontWeight: 600, color: "#141414", textTransform: "none" },
	contentBoxSecond: { display: "flex", flexWrap: "wrap", padding: 0 },
	walletText: { display: "block", width: "50%" },
	notConnected: {
		display: "block",
		width: "50%",
		textAlign: "right",
		color: "#FF9999",
	},
	description: {
		mt: "48px",
		textAlign: "center",
		padding: "0 30px",
		lineHeight: "20px",
	},
};

export default styles;
