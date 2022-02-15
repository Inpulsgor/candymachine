import * as anchor from "@project-serum/anchor";

export interface MinterProps {
	candyMachineId?: anchor.web3.PublicKey;

	connection: anchor.web3.Connection;
	startDate: number;
	txTimeout: number;
	rpcHost: string;
}
