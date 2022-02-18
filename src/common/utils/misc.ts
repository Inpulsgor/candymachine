import * as anchor from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SystemProgram, PublicKey } from "@solana/web3.js";
import {
  LAMPORTS_PER_SOL,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";

import { CandyMachineAccount } from "types/candymachine";
import { Phase } from "common/components/PhaseHeader/PhaseHeader.types";
import { mintPanic } from "common/components/UserSettings/UserSettings";
import {
  publicSaleSettings,
  whitelistSettings,
} from "common/components/UserSettings/UserSettings";

export const FAIR_LAUNCH_PROGRAM_ID = new anchor.web3.PublicKey(
  "faircnAB9k59Y4TXmLabBULeuTLgV7TkGMGNkjnA15j"
);

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID =
  new anchor.web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

export const CIVIC = new anchor.web3.PublicKey(
  "gatem74V238djXdzWnJf94Wo1DcnuGkfijbf3AuBhfs"
);

export const TOKEN_MINT_ADDRESS = new anchor.web3.PublicKey(
  "9SnPTXx2CU1vuSXrbEfqKJRLDEZKXiD9kjE2pLwmk2Tx"
);

export const toDate = (value?: anchor.BN) => {
  if (!value) {
    return;
  }

  return new Date(value.toNumber() * 1000);
};

const numberFormater = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = {
  format: (val?: number) => {
    if (!val) {
      return "--";
    }

    return numberFormater.format(val);
  },
  asNumber: (val?: anchor.BN) => {
    if (!val) {
      return undefined;
    }

    return val.toNumber() / LAMPORTS_PER_SOL;
  },
};

export const getFairLaunchTicketSeqLookup = async (
  tokenMint: anchor.web3.PublicKey,
  seq: anchor.BN
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("fair_launch"),
      tokenMint.toBuffer(),
      seq.toArrayLike(Buffer, "le", 8),
    ],
    FAIR_LAUNCH_PROGRAM_ID
  );
};

export const getAtaForMint = async (
  mint: anchor.web3.PublicKey,
  buyer: anchor.web3.PublicKey
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [buyer.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  );
};

export const getNetworkExpire = async (
  gatekeeperNetwork: anchor.web3.PublicKey
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [gatekeeperNetwork.toBuffer(), Buffer.from("expire")],
    CIVIC
  );
};

export const getNetworkToken = async (
  wallet: anchor.web3.PublicKey,
  gatekeeperNetwork: anchor.web3.PublicKey
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [
      wallet.toBuffer(),
      Buffer.from("gateway"),
      Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]),
      gatekeeperNetwork.toBuffer(),
    ],
    CIVIC
  );
};

export const getFairLaunchTicket = async (
  tokenMint: anchor.web3.PublicKey,
  buyer: anchor.web3.PublicKey
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("fair_launch"), tokenMint.toBuffer(), buyer.toBuffer()],
    FAIR_LAUNCH_PROGRAM_ID
  );
};

export function createAssociatedTokenAccountInstruction(
  associatedTokenAddress: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  walletAddress: anchor.web3.PublicKey,
  splTokenMintAddress: anchor.web3.PublicKey
) {
  const keys = [
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: associatedTokenAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: walletAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: splTokenMintAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new TransactionInstruction({
    keys,
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([]),
  });
}

export function formatSol(sol: number) {
  var formated = sol / 1000000000;
  return formated;
}

export const getPhase = (
  candyMachine: CandyMachineAccount | undefined
): Phase => {
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
};

export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
}
