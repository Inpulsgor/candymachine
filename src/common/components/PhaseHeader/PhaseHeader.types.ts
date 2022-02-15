import { CandyMachineAccount } from "common/utils/candymachine";

export enum Phase {
	AnticipationPhase, // FL, AKA Phase 0
	SetPrice, // FL, AKA Phase 1
	GracePeriod, // FL, AKA Phase 2
	Lottery, // FL
	RaffleFinished, // FL, AKA Phase 3
	WaitForCM, // FL,
	Phase4,
	MintOff,
	WhiteListMint,
	PublicMint,
	Welcome,
	Panic,
}

export type PhaseHeaderProps = {
	phase: Phase;
	candyMachine?: CandyMachineAccount;
	rpcUrl: string;
};
