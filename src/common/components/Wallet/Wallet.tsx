import { FC, useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  MathWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { Minter } from "common/components";
// import Minter from "old/Minter";

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);
const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);
const txTimeout = 30000; // milliseconds (confirm this works for your project)

const Wallet: FC = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  );

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Minter
              candyMachineId={candyMachineId}
              connection={connection}
              startDate={startDateSeed}
              txTimeout={txTimeout}
              rpcHost={rpcHost}
            />
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default Wallet;
