import { CandyMachineAccount } from 'types/candymachine';

export interface MintButtonProps {
  onMint: () => Promise<void>;
  candyMachine: CandyMachineAccount | undefined;
  isMinting: boolean;
}
