import { Blockhash, FeeCalculator } from "@solana/web3.js";

export interface BlockhashAndFeeCalculator {
	blockhash: Blockhash;
	feeCalculator: FeeCalculator;
}

export enum SequenceType {
	Sequential,
	Parallel,
	StopOnFailure,
}
