import { CandyMachineAccount } from "common/utils/candymachine";

export interface MintButtonProps {
	onMint: () => Promise<void>;
	candyMachine: CandyMachineAccount | undefined;
	isMinting: boolean;
}
