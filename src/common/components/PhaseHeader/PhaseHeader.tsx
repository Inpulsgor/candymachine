import * as anchor from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Container, Grid, Typography } from "@mui/material";
import { PhaseCountdown } from "common/components";
import { toDate } from "common/utils/utils";
import { CandyMachineAccount } from "common/utils/candymachine";
import {
	publicSaleSettings,
	whitelistSettings,
	welcomeSettings,
	mintPanic,
} from "common/components/UserSettings/UserSettings";
import { Phase, PhaseHeaderProps } from "./PhaseHeader.types";

export function getPhase(candyMachine: CandyMachineAccount | undefined): Phase {
	const curr = new Date().getTime();
	// const candyMachineGoLive = toDate(candyMachine?.state.goLiveDate)?.getTime();
	const whiteListStart = toDate(whitelistSettings.startDate)?.getTime();
	const whiteListEnd = toDate(whitelistSettings.endDate)?.getTime();
	const publicSaleStart = toDate(publicSaleSettings.startDate)?.getTime();
	// const publicSaleEnd = toDate(publicSaleSettings.endDate)?.getTime();

	//Countdown, WhiteList Minting, Public Minting,

	if (mintPanic.enabled === true) {
		return Phase.Panic;
	} else if (publicSaleStart && curr > publicSaleStart) {
		return Phase.PublicMint;
	} else if (
		whitelistSettings.enabled &&
		whiteListStart &&
		whiteListEnd &&
		curr > whiteListStart &&
		curr < whiteListEnd
	) {
		return Phase.WhiteListMint;
	} else {
		return Phase.Welcome;
	}
}

const Header = (props: {
	phaseName: string;
	desc: string | undefined;
	date?: anchor.BN | undefined;
	status?: string;
	countdown?: boolean;
	countdownEnable?: boolean;
}) => {
	const { phaseName, desc, date, status, countdownEnable } = props;

	return (
		<>
			{countdownEnable === true && (
				<Grid
					container
					sx={{ position: "absolute", top: "-30px", left: "0px" }}
				>
					<Container sx={{ justifyContent: "center" }}>
						<PhaseCountdown
							date={toDate(date)}
							style={{ justifyContent: "center" }}
							status={status || "COMPLETE"}
						/>
					</Container>
				</Grid>
			)}
			<Grid container className="mintHeader" alignItems="center">
				<Grid>
					<Typography
						variant="h5"
						sx={{ fontWeight: 600, textAlign: "center" }}
						className="pb-2"
					>
						{phaseName}
					</Typography>
				</Grid>
			</Grid>
			{desc && (
				<Typography className="pb-2" variant="body1" color="textSecondary">
					{desc}
				</Typography>
			)}
		</>
	);
};

const PhaseHeader = ({ phase, candyMachine }: PhaseHeaderProps) => {
	const wallet = useWallet();
	console.log("D", candyMachine);
	console.log("Wallet", wallet);

	return (
		<>
			{phase === Phase.Panic && (
				<Header phaseName={mintPanic.title} desc={mintPanic.desc} />
			)}

			{phase === Phase.Welcome && (
				<Header
					phaseName={welcomeSettings.title}
					desc={welcomeSettings.desc}
					date={welcomeSettings.countdownTo}
					countdownEnable={welcomeSettings.countdownEnable}
				/>
			)}

			{phase === Phase.WhiteListMint && (
				<>
					<Header
						phaseName={whitelistSettings.title}
						desc={whitelistSettings.desc}
						date={whitelistSettings.endDate}
						countdownEnable={whitelistSettings.countdown}
						status="WHITELIST LIVE"
					/>
				</>
			)}

			{phase === Phase.PublicMint && (
				<>
					<Header
						phaseName={publicSaleSettings.title}
						desc={publicSaleSettings.desc}
						date={publicSaleSettings.endDate}
						countdownEnable={publicSaleSettings.countdown}
						status="LIVE"
					/>
				</>
			)}
		</>
	);
};

export default PhaseHeader;
