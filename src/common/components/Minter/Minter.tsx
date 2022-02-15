import { FC, useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Typography } from "@mui/material";

import { AlertState } from "common/utils/utils";
import { MintButton } from "common/components";
import { getPhase } from "common/components/PhaseHeader/PhaseHeader";
import { Phase } from "common/components/PhaseHeader/PhaseHeader.types";
import { MinterProps } from "./Minter.types";
import styles from "./Minter.styles";
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  CANDY_MACHINE_PROGRAM,
  getCandyMachineState,
  mintOneToken,
} from "common/utils/candymachine";

const Minter: FC<MinterProps> = ({
  connection,
  rpcHost,
  txTimeout,
  candyMachineId,
}) => {
  // const [yourSOLBalance, setYourSOLBalance] = useState<number | null>(null);
  const [whiteListTokenBalance, setWhiteListTokenBalance] = useState<number>(0);
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [mintingTotal, setMintingTotal] = useState<number | null>(null);
  const [itemsAvailable, setItemsAvailable] = useState<number | null>(null);
  const [pubKey, setPubKey] = useState<PublicKey>();
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [price, setPrice] = useState<number | null>(null);
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });
  const { publicKey, signAllTransactions, signTransaction, connected } =
    useWallet();
  const phase = getPhase(candyMachine);
  const rpcUrl = rpcHost;

  const anchorWallet = useMemo(() => {
    if (!publicKey || !signAllTransactions || !signTransaction) return;

    return {
      publicKey,
      signAllTransactions,
      signTransaction,
    } as anchor.Wallet;
  }, [publicKey, signAllTransactions, signTransaction]);

  useEffect(() => {
    (async () => {
      if (!anchorWallet) return console.log("anchor wallet not found");

      console.log("wallet connected");
      if (anchorWallet.publicKey) setPubKey(anchorWallet.publicKey);

      // try {
      //   const balance = await connection.getBalance(
      //     anchorWallet.publicKey
      //   );
      //   console.log("Sol balance is: " + balance);
      //   setYourSOLBalance(balance);
      // } catch (e) {
      //   console.log("Problem getting fair launch state");
      //   console.log(e);
      // }

      if (candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            candyMachineId,
            connection
          );
          await setCandyMachine(cndy);
        } catch (e) {
          console.log("Problem getting candy machine state");
          console.log(e);
        }
      } else {
        console.log("No candy machine detected in configuration.");
      }
    })();
  }, [anchorWallet, candyMachineId, connection]);

  useEffect(() => {
    const getTokenAmount = async () => {
      if (publicKey && candyMachine?.state.whitelistMintSettings?.mint) {
        try {
          const tokenAmount = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            {
              mint: candyMachine?.state.whitelistMintSettings?.mint,
            }
          );

          return tokenAmount.value[0].account.data.parsed.info.tokenAmount
            .amount;
        } catch {
          return 0;
        }
      }
    };

    getTokenAmount().then((wlToken) => {
      setWhiteListTokenBalance(wlToken);
      if (candyMachine?.state.whitelistMintSettings?.discountPrice && wlToken) {
        setPrice(
          candyMachine?.state.whitelistMintSettings?.discountPrice.toNumber() /
            1000000000
        );
      } else if (candyMachine?.state.price) {
        setPrice(candyMachine?.state.price.toNumber() / 1000000000);
      }
    });

    if (candyMachine?.state.itemsAvailable) {
      setItemsAvailable(candyMachine?.state.itemsAvailable);
    }

    if (candyMachine?.state.itemsRedeemed == null) {
      setMintingTotal(0);
    } else {
      setMintingTotal(candyMachine?.state.itemsRedeemed);
    }
  }, [candyMachine, publicKey, connection]);

  const onMint = async () => {
    try {
      setIsMinting(true);
      document.getElementById("#identity")?.click();
      if (connected && candyMachine?.program && publicKey) {
        const mintTxId = (await mintOneToken(candyMachine, publicKey))[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            txTimeout,
            connection,
            "singleGossip",
            true
          );
        }

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });

          setMintingTotal(mintingTotal! + 1);

          if (whiteListTokenBalance && whiteListTokenBalance > 0)
            setWhiteListTokenBalance(whiteListTokenBalance - 1);
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x138")) {
          message = "";
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <>
      {(phase === Phase.PublicMint || Phase.WhiteListMint) && (
        <>
          {!connected ? (
            <WalletDialogButton
              sx={styles.walletBtn}
              variant="contained"
              fullWidth
            >
              <Typography sx={styles.walletBtnText} variant="body1">
                Connect Wallet
              </Typography>
            </WalletDialogButton>
          ) : (
            <>
              {candyMachine?.state.isActive &&
              candyMachine?.state.gatekeeper &&
              publicKey &&
              signTransaction ? (
                <GatewayProvider
                  wallet={{
                    publicKey:
                      publicKey || new PublicKey(CANDY_MACHINE_PROGRAM),
                    //@ts-ignore
                    signTransaction,
                  }}
                  // // Replace with following when added
                  // gatekeeperNetwork={candyMachine.state.gatekeeper_network}
                  gatekeeperNetwork={
                    candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                  } // This is the ignite (captcha) network
                  /// Don't need this for mainnet
                  clusterUrl={rpcUrl}
                  options={{ autoShowModal: false }}
                >
                  <MintButton
                    candyMachine={candyMachine}
                    isMinting={isMinting}
                    onMint={onMint}
                  />
                </GatewayProvider>
              ) : (
                <MintButton
                  candyMachine={candyMachine}
                  isMinting={isMinting}
                  onMint={onMint}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Minter;
